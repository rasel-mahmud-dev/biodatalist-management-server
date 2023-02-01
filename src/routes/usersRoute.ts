import {Router} from "express"
import {getAllUsers} from "../controllers/usersController";
import {auth, permission} from "../middlewares";
import {Role} from "../types";

const router = Router()

router.get("/users", auth, permission(Role.ADMIN), getAllUsers)


export default router