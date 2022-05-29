import auth from '../controllers/auth.controller.js'
import { Router } from 'express'

const router = Router()

router.post('/register', auth.REGISTER)
router.post('/login', auth.LOGIN)

export default router 