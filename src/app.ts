import express, {NextFunction, Request, Response} from "express";
import cors from "cors"
const morgan  = require("morgan")
import routes from "./routes";
import passport from "passport";

// passport config initial...
import("./services/googleOauth")

require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan("dev"))



// passport initialize
app.use(passport.initialize())

app.use(routes)

app.get("/",  async (req: Request, res: Response) => {
    res.send("Hello world")
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

export default app;