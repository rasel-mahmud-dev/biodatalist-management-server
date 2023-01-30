import {NextFunction, Request, Response} from "express";
import {parseToken} from "../services/jwt";


export async function auth(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["token"] as string
    if (!token) {
        return next("Please login first")
    }

    try {
        req.user = await parseToken(token)
        next()

    } catch (ex) {
        return next("Please login first")
    }


}