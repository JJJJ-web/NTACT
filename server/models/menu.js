const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
    return sequelize.define('menu', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        name_kor: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        name_eng: {
            type: DataTypes.STRING(45),
            allowNull: false,
        },
        img_url: {
            type: DataTypes.STRING(45),
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING(300),
            allowNull: true,
        },
        sales_stat: {
            type: DataTypes.TINYINT,
            allowNull: true,
            defaultValue: 1,
        },
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'category',
                key: 'id',
            },
        },
    }, {
        sequelize,
        tableName: 'menu',
        timestamps: false,
        indexes: [
            {
                name: 'PRIMARY',
                unique: true,
                using: 'BTREE',
                fields: [
                    {name: 'id'},
                ],
            },
            {
                name: 'fk_menu_category_idx',
                using: 'BTREE',
                fields: [
                    {name: 'category_id'},
                ],
            },
        ],
    });
};
