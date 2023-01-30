import {Router} from "express"
import {fetchCurrentAuth, login, registration} from "../controllers/authController";
import {auth} from "../middlewares";

const router = Router()

router.post("/auth/login", login)
router.post("/auth/registration", registration)
router.get("/auth/fetch-current-auth", auth, fetchCurrentAuth)


export default router