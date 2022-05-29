import errors from '../utils/error.js'

let ALL_ADMINS = async (req, res, next) => {
    try {
        const allUsers = await req.models.User.findAll({
            where: {
                user_is_admin: true
            }
        })

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


let CHANGE_ADMIN = async (req, res, next) => {
    try {
        let { user_id, admin } = req.body
        const allUsers = await req.models.User.findAll()
        admin = admin?.trim()
        if (!admin || admin != 'true' && admin != 'false') {
            return next(
                new errors.ValidationError(400, 'Invalid admin status')
            )
        }

        if(!req.userData.user_is_admin) {
            return next(
                new errors.AuthorizationError(400, 'You are not allowed to see all Users')
            )
        }

        const user = allUsers.find(user => user.user_id == user_id)
        if(user) {
            await req.models.User.update({
                user_is_admin: admin
            }, {
                where: {
                    user_id
                }
            })
            return res
                .status(200)
                .json({
                    status: 200,
                    message: "Admin status changed successfully"
            })
        }else{
            return next(
                new errors.AuthorizationError(400, 'The User does not exist')
            )
        }


    } catch (error) {
        console.log(error);
        return next(new errors.InternalServerError(500, error.message))
    }
}

export default {
    ALL_ADMINS,
    CHANGE_ADMIN,
} 