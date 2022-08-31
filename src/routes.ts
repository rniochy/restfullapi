import {Express, Request, Response, Router} from "express";
import { createUserHandler} from "./controller/user.controller";
import {invalidateUserSessionHandler, sessionUserHandler, getUserSessionsHandler } from "./controller/session.controller";
import {validateRequest, requiresUser} from "./middleware"
import { createUserSchema} from "./schema/user.schema";
import {sessionUserSchema} from "./schema/session.schema"; 
import { createPostSchema, deletePostSchema, updatePostSchema } from "./schema/post.schema";
import { createPostHandler, deletePostHandler, getPostHandler, updatePostHandler } from "./controller/post.controler";


export default function(app: Express){
 app.get("/test", (req: Request, res: Response)=> res.sendStatus(200)); 
 // CREATE 
 app.post("/api/createuser", validateRequest(createUserSchema), createUserHandler);
 
 //LOGIN
 app.post("/api/createsession", validateRequest(sessionUserSchema), sessionUserHandler);
 // Get the user's sessions
 app.get("/api/sessions", requiresUser, getUserSessionsHandler); 
 //LOGOUT
 app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler)

 /*  POST OF USER*/
 // create a post 
 app.post("/api/createpost", [requiresUser, validateRequest(createPostSchema)], createPostHandler);
 // get post
 app.get("/api/createpost/:postId", getPostHandler); 
 // update post
 app.put("/api/post/:postId", [requiresUser, validateRequest(updatePostSchema)], updatePostHandler);
 // delete post
 app.delete("/api/post/:postId", [requiresUser, validateRequest(deletePostSchema)], deletePostHandler);
}