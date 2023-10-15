import express from "express"
import { createNewUser, authUser,  userProfile, otherProfile, checkAdmin } from "../controllers/User.controllers.js";
import checkAuth  from '../middleware/checkAuth.js'


const router = express.Router()

//Area Pública en react
router.post("/", createNewUser)
router.post("/login", authUser)


//Rutas privadas
router.get('/profile', checkAuth, userProfile)
router.get('/user-profile', checkAuth, otherProfile)
router.get('/alldata', checkAuth, checkAdmin)
export default router;
