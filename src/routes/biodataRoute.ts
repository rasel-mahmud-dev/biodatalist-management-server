import {Router} from "express"
import {getAllBiodata, filterBiodata, udpateBiodata, getCurrentUserBiodata} from "../controllers/biodataController";
import {auth, permission} from "../middlewares";
import {Role} from "../types";

const router = Router()

// get current logged user bio data
router.get("/biodata", auth, getCurrentUserBiodata)


// get all user bio data for only admin user
router.get("/biodata", auth, permission(Role.ADMIN), getAllBiodata)


router.patch("/biodata", auth, udpateBiodata)


router.post("/biodata/filter", filterBiodata)


export default router