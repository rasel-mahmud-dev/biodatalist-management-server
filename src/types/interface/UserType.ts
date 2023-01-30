import {ObjectId} from "mongodb";
import {Role} from "../index";

interface UserType {
    _id?: string | ObjectId
    username: string
    email: string
    password: string
    role: Role
    avatar?: string
    createdAt?: Date | string
}

export default UserType