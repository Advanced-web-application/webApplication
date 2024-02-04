import mongoose from "mongoose";

export interface IPost {
  name: string;
  description: string;
  price: number;
  owner: string;
  comments?: string[];
  image?: string;
}

const PostSchema = new mongoose.Schema<IPost>({
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

export default mongoose.model<IPost>("Post", PostSchema);
