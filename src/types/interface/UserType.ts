import {ObjectId} from "mongodb";

interface UserType {
    _id?: string | ObjectId
    username: string
    email: string
    password: string
    avatar?: string
    createdAt?: Date | string
}

export default UserType