"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PostSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true
    },
    owner: {
        type: String,
        required: true,
    },
    comments: {
        type: [String],
        required: false,
    },
    image: {
        type: String,
        required: false,
    },
});
exports.default = mongoose_1.default.model("Post", PostSchema);
//# sourceMappingURL=post_model.js.map