import {Request, Response} from "express";
import config from 'config';
import createSession, { createAccesToken } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { sign } from "../util/jwt.util";

export async function sessionUserHandler(req: Request, res: Response){
     const user = await validatePassword(req.body);

     if(!user){
         return res.status(401).send({error: "Invalid Email or Password "});
     }

     const session = await createSession(user._id, req.get("user-agent") || "");
    
     const acessToken = createAccesToken({ user, session});

     const refreshToken = sign(
            {session: session}, 
        {
            expiresIn: config.get("refreshTokenTtl")
        }
    );
    
    return res.send(
        {acessToken, refreshToken}
    );

}