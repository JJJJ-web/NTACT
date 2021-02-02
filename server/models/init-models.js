const DataTypes = require('sequelize').DataTypes;
const _category = require('./category');
const _devCategory = require('./dev_category');
const _devMenu = require('./dev_menu');
const _devUser = require('./dev_user');
const _menu = require('./menu');
const _user = require('./user');

function initModels(sequelize) {
    const category = _category(sequelize, DataTypes);
    const devCategory = _devCategory(sequelize, DataTypes);
    const devMenu = _devMenu(sequelize, DataTypes);
    const devUser = _devUser(sequelize, DataTypes);
    const menu = _menu(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);

    devMenu.belongsTo(devCategory, {as: 'category_', foreignKey: 'category_id'});
    devCategory.hasMany(devMenu, {as: 'dev_menus', foreignKey: 'category_id'});
    menu.belongsTo(category, {as: 'category_', foreignKey: 'category_id'});
    category.hasMany(menu, {as: 'menus', foreignKey: 'category_id'});

    return {
        category,
        devCategory,
        devMenu,
        devUser,
        menu,
        user,
    };
}

module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
