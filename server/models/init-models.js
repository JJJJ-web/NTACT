var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _dev_category = require("./dev_category");
var _dev_menu = require("./dev_menu");
var _dev_merchant = require("./dev_merchant");
var _dev_option = require("./dev_option");
var _dev_option_category = require("./dev_option_category");
var _dev_orders = require("./dev_orders");
var _dev_user = require("./dev_user");
var _menu = require("./menu");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var dev_category = _dev_category(sequelize, DataTypes);
  var dev_menu = _dev_menu(sequelize, DataTypes);
  var dev_merchant = _dev_merchant(sequelize, DataTypes);
  var dev_option = _dev_option(sequelize, DataTypes);
  var dev_option_category = _dev_option_category(sequelize, DataTypes);
  var dev_orders = _dev_orders(sequelize, DataTypes);
  var dev_user = _dev_user(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  dev_menu.belongsTo(dev_category, { as: "category", foreignKey: "category_id"});
  dev_category.hasMany(dev_menu, { as: "dev_menus", foreignKey: "category_id"});
  dev_option.belongsTo(dev_option_category, { as: "category", foreignKey: "category_id"});
  dev_option_category.hasMany(dev_option, { as: "dev_options", foreignKey: "category_id"});
  dev_orders.belongsTo(dev_merchant, { as: "dev_merchant", foreignKey: "dev_merchant_id"});
  dev_merchant.hasMany(dev_orders, { as: "dev_orders", foreignKey: "dev_merchant_id"});
  menu.belongsTo(category, { as: "category", foreignKey: "category_id"});
  category.hasMany(menu, { as: "menus", foreignKey: "category_id"});

  return {
    category,
    dev_category,
    dev_menu,
    dev_merchant,
    dev_option,
    dev_option_category,
    dev_orders,
    dev_user,
    menu,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
