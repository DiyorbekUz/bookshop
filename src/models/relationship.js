import { Model, DataTypes } from 'sequelize'

export default async function ({ sequelize }) {
    const User = sequelize.models.User
    const Order = sequelize.models.Order
    const Product = sequelize.models.Product
    const Category = sequelize.models.Category

    await User.hasOne(Order, {
        foreignKey: 'user_id',
    })
    await Order.belongsTo(Product, {
        foreignKey: 'product_id',
    })
    await Product.belongsTo(Category, {
        foreignKey: 'category_id',
    }) 
}