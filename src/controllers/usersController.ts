import {NextFunction, Request, Response} from "express";
import UserType from "../types/interface/UserType";
import User from "../models/User";



export const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const users = await User.find<UserType>({}, {projection: {password: 0}})
        // send response to client
        res.status(200).json(users)
    } catch (ex) {
        next(ex)
    }

}
