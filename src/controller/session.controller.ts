import {Request, Response} from "express";
import createSession from "../service/session.service";
import { validatePassword } from "../service/user.service";

export async function sessionUserHandler(req: Request, res: Response){
     const user = await validatePassword(req.body);

     if(!user){
         return res.status(401).send({error: "Invalid Password"});
     }

     const session = createSession(user._id, req.get("user-agent") || "");

}