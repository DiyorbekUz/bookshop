import { Model, DataTypes } from 'sequelize';

export default async function ({sequelize}) {
    class Order extends Model {}

    Order.init({
        order_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
         
        product_price: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        order_is_paid: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        },
         
        order_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    }, {
        sequelize,
        tableName: 'orders',
        modelName: 'Order',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        underscored: true, 
    })

} 