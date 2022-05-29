import { Model, DataTypes } from 'sequelize';
import errors from '../utils/error.js';

export default async function ({sequelize}) {
    class Products extends Model {}

    Products.init({
        product_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
         
        product_name: {
            type: DataTypes.STRING,
            allowNull: false,
        }, 
         
        product_img: {
            type: DataTypes.STRING,
            allowNull: false
        },

        product_price: {
            type: DataTypes.INTEGER,
            primaryKey: true,
        },
         
        short_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
         
        long_description: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        tableName: 'products',
        modelName: 'Product',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        underscored: true, 
        sequelize,
        logging: false
    })
    
}