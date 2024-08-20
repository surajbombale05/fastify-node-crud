import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/db';
import { CustomFields } from './user_schemas';  // Assuming this is your User model

class ProductSchema extends Model {}

ProductSchema.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
        },
        userId: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: "users",
                key: "id",
            },
        },
        productOwner: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        productName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        is_deleted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        },
    },
    {
        sequelize,
        tableName: 'products',
        timestamps: false,
    }
);

ProductSchema.belongsTo(CustomFields, { foreignKey: 'userId', as: 'user' });
CustomFields.hasMany(ProductSchema, { foreignKey: 'userId', as: 'products' });

export { ProductSchema };
