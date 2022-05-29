import express from 'express'
import cors from 'cors'
import path from 'path'
import './config/index.js'
import fileUpload from 'express-fileupload'
import fs from 'fs'
import database from "./config/db.config.js"
import mockData from "./utils/mock.js"

// other datas
const PORT = process.env.PORT || 5000
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(fileUpload());

// create public folder
app.use(express.static(path.join(process.cwd(), 'uploads')))

// routes
import authRouter from './routes/auth.router.js'
import categoryRouter from './routes/categories.router.js'
import productRouter from './routes/products.router.js'
import orderRouter from './routes/orders.router.js'
import userRouter from './routes/users.router.js'
import adminRouter from './routes/admin.router.js'

// sequelize initailize 
!async function () {
    try {
        const db = await database()
        app.use((req, res, next) => {
            req.models = db.models
            req.sequelize = db
            next()
        })

        // initailize routes
        app.use(authRouter)
        app.use(categoryRouter)
        app.use(productRouter)
        app.use(orderRouter)
        app.use(userRouter)
        app.use(adminRouter)
        
        // load mock data
        // await mockData({ sequelize: db })
        // console.log('Mock data was loaded successfully.')
    } catch (error) {
        console.log(error)
    }
    app.use((error, req, res, next) => {
        if (error.name == 'ValidationError') {
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
                errorName: error.name,
                error: true,
            })
        }
    
        
        if (error.status != 500) {
            error.status = error.status ? error.status : 404
            return res.status(error.status).json({
                status: error.status,
                message: error.message,
                errorName: error.name,
                error: true,
            })
        }
        
        fs.appendFileSync('./log.txt', `${req.url}__${req.method}__${Date.now()}__${error.name}__${error.message}\n`)
        
        return res.status(error.status).json({
            status: error.status,
            message: 'Internal Server Error',
            errorName: error.name,
            error: true,
        })
    })
    app.listen(PORT, () => console.log('backend server ready at *' + PORT))
}()