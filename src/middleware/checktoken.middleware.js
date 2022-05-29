import errors from '../utils/error.js'
import JWT from '../utils/jwt.js'

export default async function (req, res, next){
	try {
		let { token } = req.headers
		let users = await req.models.User.findAll()
		if(!token) {
			return next(
                new errors.AuthorizationError(400, 'User is un authorized')
            )
		} 

		console.log('middleware');
		const { userId, agent, username } = JWT.verify(token)
		if(!(req.headers['user-agent'] == agent)) {
			return next(
                new errors.AuthorizationError(400, 'Token is invalid')
            )
		}

		let user = users.find(user => user.user_id == userId)
		if(!user) {
			return next(
                new errors.AuthorizationError(400, 'The token invalid')
            )
		}
		req.userData = {
			user_id: user.user_id,
			user_name: user.user_name,
			user_img: user.user_img,
			user_is_admin: user.user_is_admin,
		}
		next()
	} catch(error) {
		return next(
            new errors.AuthorizationError(400, error.message)
        )
	}
}
