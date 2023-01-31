import { Role} from "../index";


declare global {
    namespace Express {
        interface Request {
            authUser: {
                _id: string,
                email: string,
                role: Role
            }
        }
    }
}
