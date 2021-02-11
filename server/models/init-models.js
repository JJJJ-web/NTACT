const DataTypes = require('sequelize').DataTypes;
const _category = require('./category');
const _dev_category = require('./dev_category');
const _dev_kakao_user = require('./dev_kakao_user');
const _dev_menu = require('./dev_menu');
const _dev_merchant = require('./dev_merchant');
const _dev_orders = require('./dev_orders');
const _menu = require('./menu');
const _user = require('./user');

function initModels(sequelize) {
    const category = _category(sequelize, DataTypes);
    const dev_category = _dev_category(sequelize, DataTypes);
    const dev_kakao_user = _dev_kakao_user(sequelize, DataTypes);
    const dev_menu = _dev_menu(sequelize, DataTypes);
    const dev_merchant = _dev_merchant(sequelize, DataTypes);
    const dev_orders = _dev_orders(sequelize, DataTypes);
    const menu = _menu(sequelize, DataTypes);
    const user = _user(sequelize, DataTypes);

    dev_menu.belongsTo(dev_category, {as: 'category', foreignKey: 'category_id'});
    dev_category.hasMany(dev_menu, {as: 'dev_menus', foreignKey: 'category_id'});
    dev_orders.belongsTo(dev_merchant, {as: 'dev_merchant', foreignKey: 'dev_merchant_id'});
    dev_merchant.hasMany(dev_orders, {as: 'dev_orders', foreignKey: 'dev_merchant_id'});
    menu.belongsTo(category, {as: 'category', foreignKey: 'category_id'});
    category.hasMany(menu, {as: 'menus', foreignKey: 'category_id'});

    return {
        category,
        dev_category,
        dev_kakao_user,
        dev_menu,
        dev_merchant,
        dev_orders,
        menu,
        user,
    };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
