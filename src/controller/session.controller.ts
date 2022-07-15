import {Request, Response} from "express";

export async function sessionUserHandler(req: Request, res: Response){
    try {
          
    } catch (error: any) {
         return res.status(400).send({error: error.message});
    }
}