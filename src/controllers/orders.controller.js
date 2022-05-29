import errors from '../utils/error.js'

const ADD_ORDER = async (req, res, next) => {
    try {
        const allProducts = await req.models.Product.findAll()

        let { user_id, product_id, order_count, order_is_paid } = req.body
		user_id = user_id?.trim()
		product_id = product_id?.trim()
		order_count = order_count?.trim()

        let product = allProducts.find(product => product.product_id == product_id)
        if(!product) {
            return next(
                new errors.ValidationError(400, 'The Product does not exist')
            )
        }

		if(
			!order_count || order_count == 0) {
			return next(
                new errors.ValidationError(400, 'Invalid Input!')
            )
		}

        let priceProduct = allProducts.find(product => product.product_id == product_id)
        let newPrice = priceProduct.product_price * order_count
        let newOrder = await req.models.Order.create({
            user_id,
            product_id,
            product_price: newPrice,
            order_count,
            order_is_paid: order_is_paid ? order_is_paid : false
        })
        
        return res
            .status(201)
            .json({
                status: 201,
                message: 'The Order successfully added!',
                category: newOrder
        })
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}


const DELETE_ORDER = async (req, res, next) => {
    try {
        const allOrders = await req.models.Order.findAll()
        let { order_id } = req.body

		order_id = order_id?.trim()

		if(
			!order_id || order_id == 0
		) {
			return next(
                new errors.ValidationError(400, 'Invalid Order ID')
            )
		}

        const order = allOrders.find(order => order.order_id == order_id)
        
		if(order) {
            let deletedOrder = await req.models.Order.destroy({
                where: {
                    order_id
                }
            })
            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'The Order successfully deleted!'
            })
        }else{
            return next(
                new errors.ValidationError(400, 'The Order does not exist')
            )
        }
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}


const UPDATE_ORDER = async (req, res, next) => {
    try {
        const allOrders = await req.models.Order.findAll()
        const allProducts = await req.models.Product.findAll()
        let {order_id, order_count } = req.body
		order_count = order_count?.trim()

		if(
			!order_count || order_count == 0
		) {
			return next(
                new errors.ValidationError(400, 'Invalid order count')
            )
		}

        const order = allOrders.find(order => order.order_id == order_id)
        
		if(order) {
            let priceProduct = allProducts.find(product => product.product_id == order.product_id)
            let newPrice = priceProduct.product_price * order_count
            await req.models.Order.update({
                order_count,
                product_price: newPrice
            }, {
                where: {
                    order_id
                }
            })
            return res
                .status(200)
                .json({
                    status: 200,
                    message: 'The Order successfully updated!'
            })
        }else{
            return next(
                new errors.AuthorizationError(400, 'The Order does not exist')
            )
        }
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}
 

const ALL_ORDERS = async (req, res, next) => {
    try {
        const allOrders = await req.models.Order.findAll()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to see all Orders')
            )
        }

        return res
            .status(200)
            .json({
                status: 200,
                categories: allOrders
        })
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}

export default {
    ADD_ORDER,
    DELETE_ORDER,
    UPDATE_ORDER,
    ALL_ORDERS
}