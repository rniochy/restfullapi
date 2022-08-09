import Session from "../model/session.model";

export default async function createSession(userId: string, userAgent: string){
    const session = await Session.create({user: userId, userAgent});
    return session.toJSON();
}