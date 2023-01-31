import {NextFunction, Request, Response} from "express";
import {parseToken} from "../services/jwt";
import {Role} from "../types";


export async function auth(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"] as string
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

export  function permission(...roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (roles.includes(req.authUser.role)) {
            next()
        } else {
            next("You are not permitted this action")
        }
    }

}