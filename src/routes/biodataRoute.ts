import {Router} from "express"
import {
    getAllBiodata,
    filterBiodata,
    udpateBiodata,
    getCurrentUserBiodata,
    getBiodataDetail, getBiodataStats
} from "../controllers/biodataController";
import {auth, permission} from "../middlewares";
import {Role} from "../types";

const router = Router()

// get current logged user bio data
router.get("/biodata", auth, getCurrentUserBiodata)


// get biodata and users slats
router.get("/biodata/stats",  getBiodataStats)


// get biodata detail
router.get("/biodata/:biodataId",  getBiodataDetail)


// get all user bio data for only admin user
router.get("/biodata/all", auth, permission(Role.ADMIN), getAllBiodata)


router.patch("/biodata", auth, udpateBiodata)


router.post("/biodata/filter", filterBiodata)



export default router