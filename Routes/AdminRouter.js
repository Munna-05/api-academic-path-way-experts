import express from 'express'
import { adminController } from '../Controllers/AdminController.js';

const router = express.Router()
//login
router.post('/login-admin',adminController.login)
router.post('/create-admin',adminController.createAdmin)








export default router;