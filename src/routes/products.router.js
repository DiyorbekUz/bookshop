import CT from '../controllers/products.controller.js'
import checktokenMiddleware from '../middleware/checktoken.middleware.js'
import { Router } from 'express'

const router = Router()

router.get('/products', checktokenMiddleware, CT.ALL_PRODUCTS)
router.post('/addproduct', checktokenMiddleware, CT.ADD_PRODUCT)
router.put('/updateproduct', checktokenMiddleware, CT.UPDATE_PRODUCT)
router.delete('/deleteproduct', checktokenMiddleware, CT.DELETE_PRODUCT)

export default router 