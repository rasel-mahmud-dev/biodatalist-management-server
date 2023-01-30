import {Router} from "express"
import {login, registration} from "../controllers/authController";

const router = Router()

router.post("/auth/login", login)
router.post("/auth/registration", registration)


export default router