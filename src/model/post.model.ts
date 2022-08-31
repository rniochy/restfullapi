import {Document, Schema, model} from "mongoose";
import { UserDocument } from "./user.model";

export interface PostDocument extends Document {
     title: string;
     body: string;
     user: UserDocument["_id"];
     postId: string;
     createdAt: Date;
     updatedAt: Date;
}

const PostSchema = new Schema({
    title: { type: String, required: true},
    body: { type: String, required: true},
    user: { type: Schema.Types.ObjectId, ref: "User"},
    postId: { type: String, default: Math.random().toString(36).substring(2,12)}
    },
    {timestamps: true}
);

const Post = model<PostDocument>("Post", PostSchema);
export default Post; 