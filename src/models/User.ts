import UserType from "../interfaces/UserType";
import {ObjectId} from "mongodb";
import Common from "./Common";
import {Role} from "../types";


class User extends Common implements UserType{
    _id?: string | ObjectId;
    email: string;
    password: string;
    role: Role;
    username: string;
    avatar?: string;
    createdAt?: Date | string;

    static collectionName = "users"

    constructor(data: UserType) {
        super(User.collectionName);
        this.username = data.username
        this.email = data.email
        this.avatar = data.avatar
        this.password = data.password
        this.role = data.role
        this.username = data.username
        this.createdAt = new Date()
    }
}

export default User