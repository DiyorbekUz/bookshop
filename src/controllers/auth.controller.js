import errors from '../utils/error.js'
import JWT from '../utils/jwt.js'
import sha256 from 'sha256'

const REGISTER = async (req, res, next) => {
    try {
        const allUsers = await req.models.User.findAll()
        let { username, password, email } = req.body

		username = username?.trim()
		password = password?.trim()
		email = email?.trim()
        var dt = new Date();

        let currentDate = `${
            dt.getMinutes().toString().padStart(2, '0')}`
		if(
			!username ||
			username.length > 50 || username.length < 3
		) {
			return next(
                new errors.AuthorizationError(400, 'Invalid username')
            )
		}

		if(
			!password ||
			password.length > 50 || password.length < 6
		) {
			return next(
                new errors.AuthorizationError(400, 'Invalid Password length')
            )
		}

        const user = allUsers.find(user => user.user_name?.toLowerCase() == username?.toLowerCase())
        
		if(user) {
            return next(
                new errors.AuthorizationError(400, 'The user already exists')
            )
        }
        
        let newUser = await req.models.User.create({
            user_name: username,
            user_password: sha256(password),
            user_is_admin: false
        }) 
        
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const agent = req.headers['user-agent']
        
        return res
            .status(201)
            .json({
                status: 201,
                message: 'The user successfully registered!',
                token: JWT.sign({ agent, ip, username, userId: newUser.user_id }),
                user: newUser
        })
        
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}

const LOGIN = async (req, res, next) => {
    try {
        const allUsers = await req.models.User.findAll()
        let { username, password } = req.body
        username = username?.trim()
        password = password?.trim()
        console.log(password);
        password = sha256(password)
        const user = allUsers.find(user => user.user_name?.toLowerCase() == username?.toLowerCase() && user.user_password == password)

        if (!user) {
            return res.status(404).json({
                status: 404,
                message: "Wrong username or password",
                errorName: 'Authorization error',
                error: true,
            })
        }

        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress
        const agent = req.headers['user-agent']

        return res.status(200).json({
            status: 200,
            message: 'The user successfully logged in!',
            token: JWT.sign({ agent, ip, username, userId: user.user_id }),
            user: {
                user_id: user.user_id,
                user_name: user.user_name,
                user_is_admin: user.user_is_admin,
            }
        })
        
    } catch (error) {
        return next(new errors.InternalServerError(500, error.message))
    }
}

export default {
    LOGIN, REGISTER
}