import errors from '../utils/error.js'
import path from 'path'
import fs from 'fs'

const ADD_CATEGORY = async (req, res, next) => {
    try {
        const allCategories = await req.models.Category.findAll()
        let { category_name } = req.body
        let { file } = req.files
		category_name = category_name?.trim()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to add a category')
            )
        }
		if(
			!category_name ||
			category_name.length > 50 || category_name.length < 1
		) {
			return next(
                new errors.AuthorizationError(400, 'Invalid Category name')
            )
		}

        if(!file) {
			return next(
                new errors.AuthorizationError(400, 'File is required')
            )
		}

		if(!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
			return next(
                new errors.AuthorizationError(400, 'Invalid mime type')
            )
		}

		if(file.size > 50 * 1024 * 1024) {
			return next(
                new errors.AuthorizationError(400, 'File is too large')
            )
		}
        const fileName = Date.now() + file.name.replace(/\s/g, "")
		const filePath = path.join(process.cwd(), 'uploads', fileName)
        
		file.mv(filePath)

        const category = allCategories.find(category => category.category_name?.toLowerCase() == category_name?.toLowerCase())
        
		if(category) {
            return next(
                new errors.AuthorizationError(400, 'The Category already exists')
            )
        }
        
        let newCategory = await req.models.Category.create({
            category_name,
            category_img: fileName
        })
        
        return res
            .status(201)
            .json({
                status: 201,
                message: 'The Category successfully added!',
                category: newCategory
        })
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
} 


const DELETE_CATEGORY = async (req, res, next) => {
    try {
        const allCategories = await req.models.Category.findAll()
        let { category_id } = req.body

		category_id = category_id?.trim()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to deleted a category')
            )
        }

		if(
			!category_id || category_id == 0
		) {
			return next(
                new errors.AuthorizationError(400, 'Invalid Category ID')
            )
		}

        const category = allCategories.find(category => category.category_id == category_id)
        
		if(category) {
            fs.unlink(path.join(process.cwd(), 'uploads', category.category_img), (err) => {
                if(err) {
                    console.log(err);
                }
            })
            let deletedCategory = await req.models.Category.destroy({
                where: {
                    category_id
                }
            })
            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'The Category successfully deleted!'
            })
        }else{
            return next(
                new errors.AuthorizationError(400, 'The Category does not exist')
            )
        }
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}


const UPDATE_CATEGORY = async (req, res, next) => {
    try {
        const allUsers = await req.models.User.findAll()
        const allCategories = await req.models.Category.findAll()
        let { category_id, category_name } = req.body

		category_name = category_name?.trim()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to updated a category')
            )
        }

		if(
			!category_id || category_id == 0
		) {
			return next(
                new errors.AuthorizationError(400, 'Invalid Category ID')
            )
		}

        if(
			!category_name ||
			category_name.length > 50 || category_name.length < 1
		) {
			return next(
                new errors.AuthorizationError(400, 'Invalid Category name')
            )
		}

        const category = allCategories.find(category => category.category_id == category_id)
        
		if(category) {
            let updatedCategory = await req.models.Category.update({
                category_name
            }, {
                where: {
                    category_id
                }
            })
            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'The Category successfully updated!'
            })
        }else{
            return next(
                new errors.AuthorizationError(400, 'The Category does not exist')
            )
        }
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}


const ALL_CATEGORIES = async (req, res, next) => {
    try {
        const allCategories = await req.models.Category.findAll()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to see all category')
            )
        }
        return res
            .status(200)
            .json({
                status: 200,
                categories: allCategories
        })
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}

export default {
    ADD_CATEGORY,
    DELETE_CATEGORY,
    UPDATE_CATEGORY,
    ALL_CATEGORIES
}