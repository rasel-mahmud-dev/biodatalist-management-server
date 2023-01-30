import {JWT_PAYLOAD, Role} from "../index";


declare global {
    namespace Express {


        interface Request {
            user: {
                _id: string,
                email: string,
                role: Role
            }
        }
    }
}
