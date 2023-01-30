import {Router} from "express"
const router = Router()

import authRoute from "./authRoute";
import biodataRoute from "./biodataRoute";
import {auth} from "../middlewares";

router.use("/api", authRoute)
router.use("/api", auth, biodataRoute)


export default router


