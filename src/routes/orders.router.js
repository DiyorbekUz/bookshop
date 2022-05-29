import CT from '../controllers/orders.controller.js'
import checktokenMiddleware from '../middleware/checktoken.middleware.js'
import { Router } from 'express'

const router = Router()

router.get('/orders', checktokenMiddleware, CT.ALL_ORDERS)
router.post('/addorder', checktokenMiddleware, CT.ADD_ORDER)
router.put('/updateorder', checktokenMiddleware, CT.UPDATE_ORDER)
router.delete('/deleteorder', checktokenMiddleware, CT.DELETE_ORDER)

export default router 