import errors from '../utils/error.js'

let ALL_USERS = async (req, res, next) => {
    try {
        const allUsers = await req.models.User.findAll()

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to see all Users')
            )
        }
        return res
            .status(200) 
            .json({
                status: 200,
                users: allUsers
        })
    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}

export default {
    ALL_USERS
}