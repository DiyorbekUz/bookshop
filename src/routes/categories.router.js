import CT from '../controllers/categories.controller.js'
import checktokenMiddleware from '../middleware/checktoken.middleware.js'
import { Router } from 'express'

const router = Router()

router.get('/categories', checktokenMiddleware, CT.ALL_CATEGORIES)
router.post('/addcategory', checktokenMiddleware, CT.ADD_CATEGORY)
router.put('/updatecategory', checktokenMiddleware, CT.UPDATE_CATEGORY)
router.delete('/deletecategory', checktokenMiddleware, CT.DELETE_CATEGORY)

export default router 