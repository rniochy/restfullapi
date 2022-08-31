import {object, string, ref} from "yup";

const payload = {
     body: object({
         title: string().required("The title is required"),
         body: string()
         .required()
         .min(120, "Body is too short - should be 120 char minimun.")
    })
}

const params ={
    params: object({
        postId: string().required("The id of post is required"),
    })
}

export const createPostSchema = object({
     ...payload
});
export const updatePostSchema = object({
     ...params, ...payload, 
});
export const deletePostSchema = object({
     ...params
});

