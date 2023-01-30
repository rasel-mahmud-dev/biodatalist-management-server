import {Router} from "express"
const router = Router()

import authRoute from "./authRoute";

router.use("/api", authRoute)


export default router


