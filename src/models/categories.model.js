import { Model, DataTypes } from 'sequelize';

export default async function ({sequelize}) {
    class Category extends Model {}

    Category.init({
        category_id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
         
        category_name: {
            type: DataTypes.STRING,
            allowNull: false, 
        },
         
        category_img: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    }, {
        tableName: 'categories',
        modelName: 'Category',
        updatedAt: 'updated_at',
        createdAt: 'created_at',
        underscored: true, 
        sequelize
    })
}