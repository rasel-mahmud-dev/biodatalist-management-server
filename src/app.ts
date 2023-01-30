import express, { Request, Response} from "express";
import cors from "cors"
import routes from "./routes";

const app = express()

app.use(cors())
app.use(express.json())


app.use(routes)

app.get("/",  async (req: Request, res: Response) => {
    res.send("Hello world")
})

export default app;