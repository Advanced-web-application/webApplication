import mongoose from "mongoose";

export interface IUser {
  fullName: string;
  age: number;
  gender: string;
  _id: string;
  email: string;
  password: string;
  image?: string;
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
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
  },
  refreshTokens: {
    type: [String],
    required: false,
  },
});

export default mongoose.model<IUser>("Users", userSchema);
