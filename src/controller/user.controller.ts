import {Response, Request} from "express"
import { omit } from "lodash";
import { createUser } from "../service/user.service";


export async function createUserHandler(req: Request, res: Response){
    try {
         const user = await createUser(req.body)
         return res.send(omit(user.toJSON(), "password"));
    } catch (error: any) {
         return res.status(400).send({error: "User exist!"});
    }
}



