import CT from '../controllers/users.controller.js'
import checktokenMiddleware from '../middleware/checktoken.middleware.js'
import { Router } from 'express'

const router = Router()

router.get('/users', checktokenMiddleware, CT.ALL_USERS)

export default router 