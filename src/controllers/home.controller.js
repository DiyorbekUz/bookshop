import errors from '../utils/error.js'
import JWT from '../utils/jwt.js'
export default async function (req, res, next, token, io, socket){
    try{
        const { userId, agent, username } = JWT.verify(token)
        let user = await req.models.User.findOne({
            where: {
                user_id: userId
            }
        })

        if(!user) {
            return next(
                new errors.AuthorizationError(400, 'The token invalid')
            )
        }else{ 
            let users = await req.models.User.findAll({
                attributes: {
                    exclude: ['user_password']
                }
            })
            user.user_socket_id = socket.id
            user.save()
            io.to(socket.id).emit('users', { users: users.filter(el => el.user_id !== user.user_id), user })
        }

        next()
    } catch(error) {
        return next(
            new errors.AuthorizationError(400, error.message)
        )
    }
}