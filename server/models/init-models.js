var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _dev_admin = require("./dev_admin");
var _dev_category = require("./dev_category");
var _dev_chef = require("./dev_chef");
var _dev_menu = require("./dev_menu");
var _dev_merchant = require("./dev_merchant");
var _dev_orders = require("./dev_orders");
var _dev_user = require("./dev_user");
var _menu = require("./menu");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var dev_admin = _dev_admin(sequelize, DataTypes);
  var dev_category = _dev_category(sequelize, DataTypes);
  var dev_chef = _dev_chef(sequelize, DataTypes);
  var dev_menu = _dev_menu(sequelize, DataTypes);
  var dev_merchant = _dev_merchant(sequelize, DataTypes);
  var dev_orders = _dev_orders(sequelize, DataTypes);
  var dev_user = _dev_user(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  dev_admin.belongsTo(dev_merchant, { as: "dev_merchant", foreignKey: "dev_merchant_id"});
  dev_merchant.hasMany(dev_admin, { as: "dev_admins", foreignKey: "dev_merchant_id"});
  dev_chef.belongsTo(dev_merchant, { as: "dev_merchant", foreignKey: "dev_merchant_id"});
  dev_merchant.hasMany(dev_chef, { as: "dev_chefs", foreignKey: "dev_merchant_id"});
  dev_orders.belongsTo(dev_merchant, { as: "dev_merchant", foreignKey: "dev_merchant_id"});
  dev_merchant.hasMany(dev_orders, { as: "dev_orders", foreignKey: "dev_merchant_id"});

  return {
    category,
    dev_admin,
    dev_category,
    dev_chef,
    dev_menu,
    dev_merchant,
    dev_orders,
    dev_user,
    menu,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
