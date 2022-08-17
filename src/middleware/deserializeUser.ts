import {get} from 'lodash';
import {Request, Response, NextFunction} from 'express';
import { decode } from '../util/jwt.util';
import { reIssueAcessToken } from '../service/session.service';

const deserializeUser = async (
    req: Request,
    res: Response,
    next: NextFunction
    ) => {
        const acessToken = get(req, "headers.authorization", "").replace(/^Bearer\s/,"");

        const refreshToken = get(req, "headers.x-refresh");

        if(!acessToken) return next();

        const {decoded, expired} = decode(acessToken);

        if(decoded){
            req['body'].user = decoded;
            return next();
        }

        if(expired && refreshToken){
            const newAcessToken = await reIssueAcessToken({refreshToken});
            
            if(newAcessToken) {
                //Add the acess token to the response header
                res.setHeader("x-acess-token", newAcessToken);

                const {decoded} = decode(newAcessToken);

                req.body.user = decoded;
            }
             return next();
        }
        return next();
}
export default deserializeUser;

