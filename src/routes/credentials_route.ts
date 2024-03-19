import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();
const secretKey = process.env.JWT_SECRET;

/**
 * @swagger
 * tags:
 *   name: Credentials
 *   description: The Credentials API
 */

/**
 * @swagger
 * /generate-credentials:
 *   post:
 *     summary: Generate credentials
 *     tags: [Credentials]
 *     responses:
 *       200:
 *         description: Generate credentials
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */
router.post('/generate-credentials', (req, res) => {
  const payload = {
    username: 'example_user',
    role: 'admin',
  };

  const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

export default router;
