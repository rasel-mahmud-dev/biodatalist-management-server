import {NextFunction, Request, Response} from "express";
import CustomError from "../interfaces/CustomError";



function errorNext(next: NextFunction, message: string, statusCode: number = 500) {
    let newError: CustomError  = new Error()
    if(typeof newError.message === "string") newError.message = message
    newError.statusCode = statusCode
    next(newError)
}

export default errorNext