import config from "config";
import { LeanDocument } from "mongoose";
import  Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import { sign } from "../util/jwt.util";

export default async function createSession(userId: string, userAgent: string){
    const session = await Session.create({user: userId, userAgent});
    return session.toJSON();
}

export function createAccesToken (
    {user, session} : 
     {user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "passord">>,
        session: 
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "passord">>,
    })
    {
        const acessToken = sign(
             {...user, session: session._id},
             {expiresIn: config.get("acessTokenTtl")} 
        );
        return acessToken;
}