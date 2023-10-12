import express from "express"
import { createNewUser, authUser, confirmTokenUser,  checkTokenUser,  userProfile, otherProfile } from "../controllers/User.controllers.js";
import checkAuth  from '../middleware/checkAuth.js'


const router = express.Router()

//Area Pública en react
router.post("/", createNewUser)
router.post("/login", authUser)

router.get('/auth/check-email', )

//Rutas privadas
router.get('/profile', checkAuth, userProfile)
router.get('/user-profile', checkAuth, otherProfile)
// TODO: router.get('/alldata', checkAuth, checkAdmin)
export default router;
