import express, {NextFunction, Request, Response} from "express";
import cors from "cors"
const morgan  = require("morgan")
import routes from "./routes";
import passport from "passport";


import translationMiddleware from "./middlewares/translationMiddleware";
import CustomError from "./interfaces/CustomError";

// passport config initial...
import("./services/googleOauth")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))

// use translation middleware
app.use(translationMiddleware)


// passport initialize
app.use(passport.initialize())

app.use(routes)

app.get("/",  async (req: Request, res: Response) => {
    const response = req.t('greeting');
    res.send(response)
})


// global error route handler
app.use((err: CustomError, req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_ENV === "development"){
        console.log(err)
    }

    let statusCode = 500
    if(err.statusCode){
        statusCode = err.statusCode
    }
    let message = req.t("Internal server error");

    if(typeof err.message === "string") {
        message = req.t(err.message)
    }

    res.status(statusCode).json({message})
})

module.exports = app;
export default app;