import { omit } from "lodash";
import {DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery} from "mongoose";
import Post, {PostDocument} from '../model/post.model';

export async function creatPost(input: DocumentDefinition<PostDocument>){
    try {
            return await Post.create(input)
    } catch(error: any){
        throw new Error(error);
    }
}

export function findPost(
    query: FilterQuery<PostDocument>,
    options: QueryOptions = {lean: true}
    ){
      return Post.findOne(query, {}, options);
}
export function findAndUpdate(
    query: FilterQuery<PostDocument>,
    options: QueryOptions,
    update: UpdateQuery<PostDocument>
    ){
      return Post.findOneAndUpdate(query, {}, options);
}

export function deletePost (
    query: FilterQuery<PostDocument>,
    ){
      return Post.deleteOne(query);
}

 