import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import UserType from "../types/interface/UserType";
import {comparePassword, createHashPassword} from "../services/bcrypt";
import {generateToken} from "../services/jwt";
import {Role} from "../types";

export const login = async (req: Request, res: Response, next: NextFunction) =>{

    try{
        const user = await User.findOne<UserType | null>({email: req.body.email})

        // check if user exist or not
        // if not then send error message
        if(!user) return res.status(404).json({message: "This user not registered yet"})


        // now check password
        let isPasswordMatch = await comparePassword(user.password, user.password)
        if(!isPasswordMatch){
            return res.status(409).json({message: "Your password is wrong"})
        }

        // generate token
        let token = generateToken(user._id as string, user.email, user.role)

        // send response to client
        res.status(201).json({
            message: "User Logged",
            user: {
                ...user,
                token: token
            }
        })


    } catch (ex){
        next(ex)
    }

}



export const registration = async (req: Request, res: Response, next: NextFunction) =>{

    try{
        const {email, password, username, avatar } = req.body

        const user = await User.findOne<UserType>({email})


        // check if user exist or not
        // if exist then send error message
        if(user) return res.status(404).json({message: "This user registered, Please login"})

        // create new user
        let newUser = new User({
            email,
            password: "",
            role: Role.CUSTOMER,
            username,
            avatar
        })

        // generate hash of password

        let hash = await createHashPassword(password)
        newUser.password = hash

        let response = await newUser.save<UserType>()
        if(!response){
            return res.status(500).json({message: "User registration fail"})
        }

        let token = generateToken(response._id as string, response.email, response.role)

        // send response to client
        res.status(201).json({
            message: "User Registered",
            user: {
                ...response,
                token: token
            }
        })


    } catch (ex){
        next(ex)
    }

}