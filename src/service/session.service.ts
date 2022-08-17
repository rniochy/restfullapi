import config from "config";
import { get, Omit } from "lodash";
import { LeanDocument } from "mongoose";
import  Session, { SessionDocument } from "../model/session.model";
import { UserDocument } from "../model/user.model";
import { decode, sign } from "../util/jwt.util";
import { findUser } from "./user.service";

export default async function createSession(userId: string, userAgent: string){
    const session = await Session.create({user: userId, userAgent});
    return session;
}

export function createAcessToken({
    user, session
    } :  {
        user:
        | Omit<UserDocument, "password">
        | LeanDocument<Omit<UserDocument, "passord">>,
        session: 
        | Omit<SessionDocument, "password">
        | LeanDocument<Omit<SessionDocument, "passord">>,
    })
    {
        const acessToken = sign(
             {user, session: session._id},
             {expiresIn: config.get("acessTokenTtl")} 
        );
        return acessToken;
}

export async function reIssueAcessToken({refreshToken}: {refreshToken: string}){
    const {decoded} = decode(refreshToken);
    console.log(decoded);

    if(!decoded || !get(decoded, "_id")) return false;

    const session = await Session.findById(get(decoded, "_id"));

    if(!session || !session?.valid) return false;

    const user = await findUser({_id: session.user});

    if(!user) return false;

    const acessToken = createAcessToken({user, session});
     
    return acessToken;
}