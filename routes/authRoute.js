import express from 'express'
import { 
    loginController, 
    registerController, 
    testController,
    forgotPasswordController
} from '../controllers/authController.js'
import { requireSignIn, isAdmin } from '../middlewares/authMiddleware.js'

//router object 
const router = express.Router()

//routing 
//REGISTER || METHOD POST 
router.post('/register', registerController)

// LOGIN || POST 
router.post('/login', loginController)

// Forgot Password
router.post('/forgot-password', forgotPasswordController)

// test routes
router.get('/test', testController)

// protected route auth
router.get("/user-auth", requireSignIn, (req,res) => {
    res.status(200).send({ ok: true})
})

// protected route auth
router.get("/admin-auth", requireSignIn, isAdmin, (req,res) => {
    res.status(200).send({ ok: true })
})

export default router   