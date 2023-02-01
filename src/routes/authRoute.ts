import {Router} from "express"
import {fetchCurrentAuth, login, registration, responseGoogleLogin} from "../controllers/authController";
import {auth} from "../middlewares";
import  passport from "passport"

const router = Router()

router.post("/auth/login", login)
router.post("/auth/registration", registration)
router.get("/auth/fetch-current-auth", auth, fetchCurrentAuth)


// call from client
router.get('/auth/google',
    passport.authenticate('google', {scope: ['profile', 'email'], session: false}));


router.get('/auth/callback/google', passport.authenticate('google', {session: false}),  responseGoogleLogin)





export default router