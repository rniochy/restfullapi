import {Express, Request, Response, Router} from "express";
import { createUserHandler} from "./controller/user.controller";
import {invalidateUserSessionHandler, sessionUserHandler } from "./controller/session.controller";
import {validateRequest, requiresUser} from "./middleware"
import { createUserSchema} from "./schema/user.schema";
import {sessionUserSchema} from "./schema/session.schema"; 


export default function(app: Express){
 app.get("/test", (req: Request, res: Response)=> res.sendStatus(200)); 
 
 app.post("/api/createuser", validateRequest(createUserSchema), createUserHandler);
 
 app.post("/api/createsession", validateRequest(sessionUserSchema), sessionUserHandler);

 app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler)
}