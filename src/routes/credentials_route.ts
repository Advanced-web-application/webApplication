import express from 'express';
import jwt from 'jsonwebtoken';


const router = express.Router();
const secretKey = process.env.JWT_SECRET; 

router.post('/generate-credentials', (req, res) => {
    
    const payload = {
        username: 'example_user', 
        role: 'admin', 
    };

    const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

    res.json({ token });
});

export default router;
