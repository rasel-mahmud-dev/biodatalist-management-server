import {Router} from "express"
const router = Router()

import authRoute from "./authRoute";
import biodataRoute from "./biodataRoute";


router.use("/api", authRoute)
router.use("/api", biodataRoute)


export default router


