import {NextFunction, Request, Response} from "express";
import User from "../models/User";
import UserType from "../interfaces/UserType";
import {comparePassword, createHashPassword} from "../services/bcrypt";
import {generateToken} from "../services/jwt";
import {Role} from "../types";
import {ObjectId} from "mongodb";
import Joi from "joi";
import errorNext from "../middlewares/errorNext";


// login handler
export const login = async (req: Request, res: Response, next: NextFunction) => {


    const schema = Joi.object({
        email: Joi.string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .min(3)
            .max(50)
            .required().label("Email")
            .messages({
                'string.email': `Please provide valid email`,
                'string.empty': `Email cannot be an empty`,
                'any.required': `Email is a required`
            }),
        password: Joi.string().required().label("Password").messages({
            'string.empty': `Password is a required`,
            'any.required': `Password is a required`
        }),
    })

    try {

        let {password, email} = req.body

        let {error} = schema.validate({email, password});
        if (error?.message) {
            return errorNext(next, error.message, 409)
        }

        const user = await User.findOne<UserType | null>({email})

        // check if user exist or not
        // if not then send error message
        if (!user) return errorNext(next, "This email not registered yet", 409)


        // now check password
        let isPasswordMatch = await comparePassword(password, user.password)


        if (!isPasswordMatch) {
            return errorNext(next, "Your password is wrong", 409)
        }


        // generate token
        let token = generateToken(user._id as string, user.email, user.role)

        // send response to client
        res.status(201).json({
            message: "User Logged",
            user: {
                ...user,
                password: "",
                token: token
            }
        })


    } catch (ex) {
        next(ex)
    }

}


// create user account
export const registration = async (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
        username: Joi.string().max(50).required().messages({
            'string.empty': `Username is a required`,
            'any.required': `Username is a required`
        }),
        email: Joi.string().email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required().label("Email")
            .messages({
                'string.email': `Please provide valid email`,
                'string.empty': `Email cannot be an empty`,
                'any.required': `Email is a required`
            }),
        password: Joi.string().required().label("Password").messages({
            'string.empty': `Password is a required`,
            'any.required': `Password is a required`
        }),
    })


    try {
        const {email, password, username, avatar} = req.body

        let {error} = schema.validate({email, password, username});
        if (error?.message) {
            return errorNext(next, error.message, 409)
        }

        const user = await User.findOne<UserType>({email})


        // check if user exist or not
        // if exist then send error message
        if (user) return errorNext(next, "This email already registered, Please login", 404)

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
        if (!response) {
            return errorNext(next, "User registration fail")
        }

        let token = generateToken(response._id as string, response.email, response.role)

        // send response to client
        res.status(201).json({
            message: "User Registered",
            user: {
                ...response,
                password: "",
                token: token
            }
        })


    } catch (ex) {
        next(ex)
    }

}


// fetch current logged user that has a valid token
export const fetchCurrentAuth = async (req: Request, res: Response, next: NextFunction) => {

    try {
        if (!req.authUser) {
            return errorNext(next, "Please login first", 409)
        }


        const user = await User.findOne<UserType | null>({_id: new ObjectId(req.authUser._id)})

        // check if user exist or not
        // if not then send error message
        if (!user) return errorNext(next, "This email not registered yet", 404)


        // send response to client
        res.status(200).json({
            message: "User Logged",
            user: {
                ...user,
                password: ""
            }
        })

    } catch (ex) {
        next(ex)
    }
}


// handle google login
export const responseGoogleLogin = (req: Request, res: Response) => {
    if (req.user) {
        let {_id, email, role} = req.user as UserType
        if (_id) {
            const token = generateToken(_id.toString(), email, role)

            // redirect client with token
            res.redirect((process.env.FRONT_END as string) + `?token=${token}`)
        }

    } else {
        // redirect client without token that's indicate login fail
        res.redirect((process.env.FRONT_END as string))
    }
}

