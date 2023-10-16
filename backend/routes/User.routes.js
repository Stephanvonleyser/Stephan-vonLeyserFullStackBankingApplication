import express from "express"
import { createNewUser, authUser,  userProfile, otherProfile, checkAdmin } from "../controllers/User.controllers.js";
import {transfer, deposit, withdraw} from "../controllers/Accounts.controllers.js"
import checkAuth  from '../middleware/checkAuth.js'
import { displayAllData } from "../controllers/Admin.controllers.js";
import { get } from "mongoose";


const router = express.Router()


//Area Pública en react
router.post("/createuser", createNewUser);  // For creating a new user
router.post("/login", authUser);  // For logging in


//Rutas privadas
router.get('/profile', checkAuth, userProfile) //check
router.get('/user-profile', checkAuth, otherProfile) //check


router.post('/account/deposit', checkAuth, deposit);
router.post('/account/withdraw', checkAuth, withdraw);
router.post('/account/transfer', checkAuth, transfer);


//Rutas privadas Admin
router.get('/admin/alldata', checkAuth, checkAdmin, displayAllData) //check   


export default router;
