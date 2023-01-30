import {Router} from "express"
import {getAllBiodata, createBiodata} from "../controllers/biodataController";
import {auth} from "../middlewares";

const router = Router()

router.get("/biodata", getAllBiodata)
router.post("/biodata", auth, createBiodata)


export default router