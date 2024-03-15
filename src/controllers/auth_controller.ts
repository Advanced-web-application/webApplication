import { Request, Response } from 'express';
import User, { IUser }  from '../models/user_model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { OAuth2Client } from 'google-auth-library';
import { Document } from 'mongoose';


const client = new OAuth2Client();
const googleSignin = async (req: Request, res: Response) => {
    console.log( "cradentiasle:" + req.body.credential);
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        
        const email = payload?.email;
        if (email != null) {
            let user = await User.findOne({ 'email': email });
            if (user == null) {
                user = await User.create(
                    {
                        'fullName': payload?.name,
                        '_id': payload?.sub,
                        'age': 0,
                        'gender': "male",
                        'email': email,
                        'password': '0',
                        'image': payload?.picture
                    });
            }
            const tokens = await generateTokens(user)
            res.status(200).send(
                {
                    email: user.email,
                    _id: user._id,
                    image: user.image,
                    ...tokens,
                })
        }
    } catch (err) {
        console.log("google " +err);
        return res.status(400).send(err.message);
    }

}

const generateTokens = async (user: Document & IUser) => {
    const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
    //console.log("process.env.JWT_EXPIRATION: ", process.env.JWT_EXPIRATION);
    const refreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
    if (user.refreshTokens == null) {
        user.refreshTokens = [refreshToken];
    } else {
        user.refreshTokens.push(refreshToken);
    }
    await user.save();
    return {
        'accessToken': accessToken,
        'refreshToken': refreshToken
    };
}

const register = async (req: Request, res: Response) => {
    const fullName = req.body.fullName;
    const age = req.body.age;
    const gender = req.body.gender;
    const id = req.body._id;
    const email = req.body.email;
    const password = req.body.password;
    const image = req.body.image;
    console.log("register: " + password);
    console.log("register: " + email);
    if (!email || !password) {
        return res.status(400).send("missing email or password");
    }
    console.log("here");
    try { 
        const rs = await User.findOne({ 'email': email });
        if (rs != null) {
            return res.status(406).send("email already exists");
        }
        const salt = await bcrypt.genSalt(10);
        const encryptedPassword = await bcrypt.hash(password, salt);
        const rs2 = await User.create({
        'fullName': fullName,
        'age':age,
        'gender':gender,
        '_id':id,
        'image': image,
        'email': email, 
        'password': encryptedPassword });

        const tokens = await generateTokens(rs2)
        return res.status(201).send({
            'fullName': fullName,
            'age':age,
            'gender':gender,
            '_id':id,
            'email': email, 
            'password': encryptedPassword,
            'image': image,
            ...tokens
        });
    } catch (err) {
        console.log("register: " +err);
        return res.status(400).send(err);
    }
}

const login = async (req: Request, res: Response) => {
    const email = req.body.email;
    const password = req.body.password;
    if (!email || !password) {
        return res.status(400).send("missing email or password");
    }
    try {
        const user = await User.findOne({ 'email': email });
        if (user == null) {
            return res.status(401).send("email or password incorrect");
        }
        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).send("email or password incorrect");
        }
        const tokens = await generateTokens(user)
        return res.status(200).send({
            'fullName': user.fullName,
            'age':user.age,
            'gender':user.gender,
            '_id':user._id,
            'email': user.email, 
            'password': user.password,
            ...tokens
        });
    } catch (err) {
        return res.status(400).send("error missing email or password");
    }
}

const logout = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user: { '_id': string }) => {
        console.log( "logout :" + err);
        if (err) return res.sendStatus(401);
        try {
            const userDb = await User.findOne({ '_id': user._id });
            if (!userDb.refreshTokens || !userDb.refreshTokens.includes(refreshToken)) {
                userDb.refreshTokens = [];
                await userDb.save();
                return res.sendStatus(401);
            } else {
                userDb.refreshTokens = userDb.refreshTokens.filter(t => t !== refreshToken);
                await userDb.save();
                console.log("logout success");
                return res.sendStatus(200);
            }
        } catch (err) {
            console.log( "logout2 :" + err);
            res.sendStatus(401).send(err.message);
        }
    });
}

const refresh = async (req: Request, res: Response) => {
    const authHeader = req.headers['authorization'];
    console.log("authHeader is: "+ authHeader);
    const refreshToken = authHeader && authHeader.split(' ')[1]; // Bearer <token>
    console.log(" refreshToken is: "+ refreshToken);
    console.log(process.env.JWT_REFRESH_SECRET);
    if (refreshToken == null) return res.sendStatus(401);
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, async (err, user: { '_id': string }) => {
        if (err) {
            console.log("refrest err: " +err);
            return res.sendStatus(401);
        }
        try {
            const userDb = await User.findOne({ '_id': user._id });
            console.log("user" +user._id);
            if (!userDb.refreshTokens || !userDb.refreshTokens.includes(refreshToken)) {
                console.log(userDb.refreshTokens);
                userDb.refreshTokens = [];
                await userDb.save();
                return res.sendStatus(401);
            }
            const accessToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
            const newRefreshToken = jwt.sign({ _id: user._id }, process.env.JWT_REFRESH_SECRET);
            userDb.refreshTokens = userDb.refreshTokens.filter(t => t !== refreshToken);
            userDb.refreshTokens.push(newRefreshToken);
            await userDb.save();
            return res.status(200).send({
                'accessToken': accessToken,
                'refreshToken': newRefreshToken
            });
        } catch (err) {
            console.log("refrest err2: " +err);
            res.sendStatus(401).send(err.message);
        }
    });
}

export default {
    googleSignin,
    register,
    login,
    logout,
    refresh,
    generateTokens
}