import {Express, Request, Response, Router} from "express";
import { createUserHandler} from "./controller/user.controller";
import {sessionUserHandler } from "./controller/session.controller";
import validateRequest from "./middleware/validateRequest"
import { createUserSchema} from "./schema/user.schema";
import {sessionUserSchema} from "./schema/session.schema"; 


export default function(app: Express){
 app.get("/test", (req: Request, res: Response)=> res.sendStatus(200));
 
 app.post("/api/createuser", validateRequest(createUserSchema), createUserHandler);
 app.post("/api/createsession", validateRequest(sessionUserSchema), sessionUserHandler);
}