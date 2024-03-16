import Post, { IPost } from "../models/post_model";
import { BaseController } from "./base_controller";
import { Response } from "express";
import { AuthResquest } from "../common/auth_middleware";

class PostController extends BaseController<IPost>{
    constructor() {
        super(Post)
    }

    async post(req: AuthResquest, res: Response) {
        console.log("post:" + req.body);
        const _id = req.user._id;
        req.body.owner = _id;
        super.post(req, res);
    }

    async addComment(req: AuthResquest, res: Response) {
        console.log("addComment:" + req.body);
        try {
            const postId = req.params.id;
            const post = await Post.findById(postId);
            if(!post)
            {
                res.status(404).send("Post not found");
                return;
            }
            if (post) {
                post.comments?.push(req.body.comment);
                await post.save();
                res.status(200).send(post);
            } else {
                res.status(404).send("Post not found");
            }
        } catch (err) {
            res.status(500).send(err);
        }

    }


}

export default new PostController();