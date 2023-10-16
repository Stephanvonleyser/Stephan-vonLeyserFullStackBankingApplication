import express from "express"
import { createNewUser, authUser,  userProfile, otherProfile, checkAdmin } from "../controllers/User.controllers.js";
import {transfer, deposit, withdraw} from "../controllers/Accounts.controllers.js"
import checkAuth  from '../middleware/checkAuth.js'


const router = express.Router()


//Area Pública en react
router.post("/createuser", createNewUser)
router.post("/login", authUser)



//Rutas privadas
router.get('/profile', checkAuth, userProfile) //check
router.get('/user-profile', checkAuth, otherProfile) //check
router.get('/alldata', checkAuth, checkAdmin)

router.post('/deposit', checkAuth, deposit);
router.post('/withdraw', checkAuth, withdraw);
router.post('/transfer', checkAuth, transfer);

export default router;
