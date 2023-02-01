import {Router} from "express"
const router = Router()

import authRoute from "./authRoute";
import biodataRoute from "./biodataRoute";
import usersRoute from "./usersRoute";


router.use("/api", authRoute)
router.use("/api", biodataRoute)
router.use("/api", usersRoute)


export default router


