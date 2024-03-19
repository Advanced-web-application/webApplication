"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
// const base = "http://" + process.env.DOMAIN_BASE + ":" + process.env.PORT + "/";
const base = "https://node12.cs.colman.ac.il/";
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/');
    },
    filename: function (req, file, cb) {
        const ext = file.originalname.split('.')
            .filter(Boolean) // removes empty extensions (e.g. `filename...txt`)
            .slice(1)
            .join('.');
        cb(null, Date.now() + "." + ext);
    }
});
const upload = (0, multer_1.default)({ storage: storage });
/**
* @swagger
* tags:
*   name: Files
*   description: The Files API
*/
/**
* @swagger
* components:
*   securitySchemes:
*     bearerAuth:
*       type: http
*       scheme: bearer
*       bearerFormat: JWT
*/
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     FileUploadResponse:
 *       type: object
 *       required:
 *         - url
 *       properties:
 *         url:
 *           type: string
 *           description: The URL of the uploaded file
 *       example:
 *        url: "http://localhost:3000/public/1625760000000.jpg"
 * */
/**
* @swagger
* /file:
*   post:
*     summary: Upload a file
*     tags: [Files]
*     security:
*       - bearerAuth: []
*     requestBody:
*       required: true
*       content:
*         multipart/form-data:
*           schema:
*             type: object
*             properties:
*               file:
*                 type: string
*                 format: binary
*     responses:
*       200:
*         description: The URL of the uploaded file
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/FileUploadResponse'
*/
router.post('/', upload.single("file"), function (req, res) {
    console.log("router.post(/file: " + base + req.file.path);
    res.status(200).send({ url: base + req.file.path });
});
module.exports = router;
//# sourceMappingURL=file_route.js.map