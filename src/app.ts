import express, {NextFunction, Request, Response} from "express";
import cors from "cors"
const morgan  = require("morgan")
import routes from "./routes";
import passport from "passport";


import translationMiddleware from "./middlewares/translationMiddleware";

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
    console.log(response)
    res.send(response)
})


// global error route handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if(process.env.NODE_ENV === "development"){
        console.log(err)
    }


    if(typeof err === "string") {
        res.status(500).json({message: err})
    } else {
        res.status(err.status || 500).json({
            message: err.message || "Internal server error"
        })
    }
})

module.exports = app;
export default app;