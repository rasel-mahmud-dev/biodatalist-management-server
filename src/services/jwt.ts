
import jwt  from "jsonwebtoken"
import {JWT_PAYLOAD} from "../types";

export function generateToken(userId: string, email: string, role: string) : string {
    let token = jwt.sign({
            _id: userId,
            email: email,
            role: role
        },
        process.env.APP_SECRET as string, {expiresIn: '7d'}
    );
    return token
}


export const parseToken = (token: string) => {
    return new Promise<JWT_PAYLOAD | any>((resolve, reject)=>{
        jwt.verify(token, process.env.APP_SECRET as string,  (error, decoded) => {
            if (error) {
                reject(error)
            }
            resolve(decoded as JWT_PAYLOAD)
        });
    })
}