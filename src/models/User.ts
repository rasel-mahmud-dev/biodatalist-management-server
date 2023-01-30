import UserType from "../types/interface/UserType";
import {ObjectId} from "mongodb";
import Common from "./Common";


class User extends Common implements UserType{
    _id?: string | ObjectId;
    email: string;
    password: string;
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
        this.username = data.username
        this.createdAt = new Date()
    }
}

export default User