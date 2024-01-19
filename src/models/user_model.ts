import mongoose from "mongoose";

export interface IUser {
  fullName: string;
  age: number;
  gender: string;
  _id: string;
  image?: string;
  email: string;
  password: string;
  refreshTokens?: string[];
}

const userSchema = new mongoose.Schema<IUser>({
  fullName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  _id: {
    type: String,
  },
  image: {
    type: String,
    required: false,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  refreshTokens: {
    type: [String],
    required: false,
  },
});

export default mongoose.model<IUser>("User", userSchema);
