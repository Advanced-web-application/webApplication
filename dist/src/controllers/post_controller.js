"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const post_model_1 = __importDefault(require("../models/post_model"));
const base_controller_1 = require("./base_controller");
class PostController extends base_controller_1.BaseController {
    constructor() {
        super(post_model_1.default);
    }
    post(req, res) {
        const _super = Object.create(null, {
            post: { get: () => super.post }
        });
        return __awaiter(this, void 0, void 0, function* () {
            console.log("post:" + req.body);
            const _id = req.user._id;
            req.body.owner = _id;
            _super.post.call(this, req, res);
        });
    }
    addComment(req, res) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            console.log("addComment:" + req.body);
            try {
                const post = yield this.model.findById(req.params.id);
                if (post) {
                    (_a = post.comments) === null || _a === void 0 ? void 0 : _a.push(req.body.comment);
                    yield post.save();
                    res.status(200).send(post);
                }
            }
            catch (err) {
                res.status(500).send("fail: " + err.message);
            }
        });
    }
}
exports.default = new PostController();
//# sourceMappingURL=post_controller.js.map