import {NextFunction, Request, Response} from "express";
import {parseToken} from "../services/jwt";
import {Role} from "../types";
import errorNext from "./errorNext";


export async function auth(req: Request, res: Response, next: NextFunction) {
    let token = req.headers["authorization"] as string

    if (!token) {
        return errorNext(next, "Please login first", 409)
    }

    try {
        req.authUser = await parseToken(token)
        next()

    } catch (ex) {
        return errorNext(next, "Please login first", 409)
    }


}

export  function permission(...roles: Role[]) {
    return function (req: Request, res: Response, next: NextFunction) {
        if (roles.includes(req.authUser.role)) {
            next()
        } else {
            errorNext(next, "You are not permitted this action", 401)
        }
    }

}