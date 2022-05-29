import {Sequelize} from 'sequelize';
import models from '../models/index.js';


const sequelize = new Sequelize({
    dialect: process.env.DIALECT,
    username: process.env.PG_USER,
    password: process.env.PG_PASSWORD, 
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT,
    logging: false,
})

export default async function(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        await models({sequelize})

        await sequelize.sync({alter: false})
        console.log('Database synced successfully.');
        
        return sequelize;
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}