import express from 'express'
import { getAllUserController } from '../controllers/userController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'

//router object 
const router = express.Router()

//routing 
//REGISTER || METHOD POST 
router.get('/alluser', getAllUserController)

export default router   