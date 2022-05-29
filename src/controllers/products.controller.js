import errors from '../utils/error.js'
import path from 'path'
import fs from 'fs'

const ADD_PRODUCT = async (req, res, next) => {
    try {
        const allProducts = await req.models.Product.findAll()
        let { category_id, product_name, product_price, short_description, long_description } = req.body
        let { file } = req.files
		category_id = category_id?.trim()
		product_name = product_name?.trim()
		product_price = product_price?.trim()
		short_description = short_description?.trim()
		long_description = long_description?.trim()

        if(!req.userData.user_is_admin) {  
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to add a Product')
            )
        }
		if(
			!product_price || product_price == 0 ||
            !short_description || short_description.length > 50 || short_description.length < 1 ||
            !long_description || long_description.length > 500 || long_description.length < 1
		) {
			return next(
                new errors.ValidationError(400, 'Invalid Input!')
            )
		}

		if(
			!product_name ||
			product_name.length > 50 || product_name.length < 1
		) {
			return next(
                new errors.ValidationError(400, 'Invalid product name')
            )
		}

        if(!file) {
			return next(
                new errors.ValidationError(400, 'File is required')
            )
		}

		if(!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
			return next(
                new errors.AuthorizationError(400, 'Invalid mime type')
            )
		}

		if(file.size > 50 * 1024 * 1024) {
			return next(
                new errors.ValidationError(400, 'File is too large')
            )
		}
        const fileName = Date.now() + file.name.replace(/\s/g, "")
		const filePath = path.join(process.cwd(), 'uploads', fileName)
        
		file.mv(filePath)

        const product = allProducts.find(product => product.product_name?.toLowerCase() == product_name?.toLowerCase())
        
		if(product) {
            return next(
                new errors.ValidationError(400, 'The Product already exists')
            )
        }
        
        let newProduct = await req.models.Product.create({
            category_id,
            product_name,
            product_price,
            short_description,
            long_description,
            product_img: fileName
        })
        
        return res
            .status(201)
            .json({
                status: 201,
                message: 'The product successfully added!',
                category: newProduct
        })
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}


const DELETE_PRODUCT = async (req, res, next) => {
    try {
        const allProducts = await req.models.Product.findAll()
        let { product_id } = req.body

		product_id = product_id?.trim()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to deleted a product')
            )
        }

		if(
			!product_id || product_id == 0
		) {
			return next(
                new errors.ValidationError(400, 'Invalid product ID')
            )
		}

        const product = allProducts.find(product => product.product_id == product_id)
        
		if(product) {
            fs.unlink( path.join(process.cwd(), 'uploads', product.product_img), (err) => {
                if(err) {
                    console.log(err);
                }
            })
            
            let deletedProduct = await req.models.Product.destroy({
                where: {
                    product_id
                }
            })
            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'The Product successfully deleted!'
            })
        }else{
            return next(
                new errors.ValidationError(400, 'The Category does not exist')
            )
        }
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}


const UPDATE_PRODUCT = async (req, res, next) => {
    try {
        const allProducts = await req.models.Product.findAll()
        let {product_id, category_id, product_name, product_price, short_description, long_description } = req.body
		category_id = category_id?.trim()
		product_name = product_name?.trim()
		product_price = product_price?.trim()
		short_description = short_description?.trim()
		long_description = long_description?.trim()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.ValidationError(400, 'You are not allowed to updated a category')
            )
        }

		if(
			!product_id || product_id == 0
		) {
			return next(
                new errors.ValidationError(400, 'Invalid product ID')
            )
		}

        const product = allProducts.find(product => product.product_id == product_id)
        
		if(product) {
            let updatedProduct = await req.models.Product.update({
                product_name: product_name ? product_name : product.product_name,
                product_price: product_price ? product_price : product.product_price,
                short_description: short_description ? short_description : product.short_description,
                long_description: long_description ? long_description : product.long_description,
                category_id: category_id ? category_id : product.category_id
            }, {
                where: {
                    product_id
                }
            })
            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'The product successfully updated!'
            })
        }else{
            return next(
                new errors.AuthorizationError(400, 'The product does not exist')
            )
        }
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}


const ALL_PRODUCTS = async (req, res, next) => {
    try {
        const allProducts = await req.models.Product.findAll()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to see all categories')
            )
        }
        return res
            .status(200)
            .json({
                status: 200,
                categories: allProducts
        })
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}

export default {
    ADD_PRODUCT,
    DELETE_PRODUCT,
    UPDATE_PRODUCT,
    ALL_PRODUCTS
}