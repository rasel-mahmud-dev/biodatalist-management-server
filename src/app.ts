import express, { Request, Response} from "express";
import cors from "cors"

const app = express()

app.use(cors())
app.use(express.json())


app.get("/",  async (req: Request, res: Response) => {
    res.send("Hello world")
})

export default app;