import { Request, Response } from "express";
import { Model } from "mongoose";

export class BaseController<ModelType>{

    model: Model<ModelType>
    constructor(model: Model<ModelType>) {
        this.model = model;
    }

    async get(req: Request, res: Response) {
        console.log("getAll");
        try {
            //if (req.query.name) {
               // const students = await this.model.find({ name: req.query.name });
               // res.send(students);
           //} else {
                const students = await this.model.find();
                res.send(students);
            //}
        } catch (err) {
            res.status(406).json({ message: err.message });
        }
    }

    async getById(req: Request, res: Response) {
        console.log("getById:" + req.params.id);
        try {
            const student = await this.model.findById(req.params.id);
            res.send(student);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }

    async post(req: Request, res: Response) {
        console.log("post:" + req.body);
        try {
            const obj = await this.model.create(req.body);
            res.status(201).send(obj);
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    async putById(req: Request, res: Response) {
        console.log("putById:" + req.body);
        try {
            await this.model.findByIdAndUpdate(req.params.id, req.body);
            const obj = await this.model.findById(req.params.id);
            res.status(200).send(obj);
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }

    async deleteById(req: Request, res: Response) {
        console.log("deleteById:" + req.body);
        try {
            await this.model.findByIdAndDelete(req.params.id);
            res.status(200).send("OK");
        } catch (err) {
            console.log(err);
            res.status(406).send("fail: " + err.message);
        }
    }
}

const createController = <ModelType>(model: Model<ModelType>) => {
    return new BaseController<ModelType>(model);
}

export default createController;