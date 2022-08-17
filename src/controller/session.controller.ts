import {Request, Response} from "express";
import config from 'config';
import createSession, {updateSession, createAcessToken, findSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service"; 
import { sign } from "../util/jwt.util";
import { get } from "lodash";

export async function sessionUserHandler(req: Request, res: Response){
     const user = await validatePassword(req.body);

     if(!user){
         return res.status(401).send({error: "Invalid Email or Password "});
     }

     const session = await createSession(user._id, req.get("user-agent") || "");
    
     const acessToken = createAcessToken({ user, session});

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

export async function invalidateUserSessionHandler(req: Request, res: Response){
      const sessionId = get(req, "user.session");

      await updateSession({_id: sessionId},{valid: false});
      return res.sendStatus(200);
}

export async function getUserSessionsHandler(req: Request, res: Response){
    //@ts-ignore
    const {user} = (req.user);

    const userId = get(user, "_id");

    const sessions = await findSessions({user: userId, valid: true});

    return res.send(sessions);
}