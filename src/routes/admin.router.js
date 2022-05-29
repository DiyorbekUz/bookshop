import CT from '../controllers/admin.controller.js'
import checktokenMiddleware from '../middleware/checktoken.middleware.js'
import { Router } from 'express'

const router = Router()

router.get('/admins', checktokenMiddleware, CT.ALL_ADMINS)
router.put('/changeadmin', checktokenMiddleware, CT.CHANGE_ADMIN)

export default router 