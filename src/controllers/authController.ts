import {Request, Response, NextFunction} from "express";
import User from "../models/User";
import UserType from "../types/interface/UserType";
import {createHashPassword} from "../services/bcrypt";
import {generateToken} from "../services/jwt";

export const login = async (req: Request, res: Response, next: NextFunction) =>{

    try{

        const user = await User<UserType>.findOne({email: req.body.email})

        // check if user exist or not
        // if not then send error message
        if(!user) return res.status(404).json({message: "This not register yet"})


        // now check password


        // generate token



        // send response to client


    } catch (ex){
        next(ex)
    }

}



export const registration = async (req: Request, res: Response, next: NextFunction) =>{

    try{
        const {email, password, username, avatar } = req.body

        const user = await User<UserType>.findOne({email: req.body.email})

        // check if user exist or not
        // if exist then send error message
        if(user) return res.status(404).json({message: "This user registered, Please login"})


        // create new user
        let newUser = new User({
            email,
            password: "",
            username,
            avatar
        })

        // generate hash of password

        let hash = await createHashPassword(password)
        newUser.password = hash

        let response = await newUser.save()
        if(!response){
            return res.status(500).json({message: "User registration fail"})
        }

        let token = await generateToken(response._id as string, response.email, response.role)

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