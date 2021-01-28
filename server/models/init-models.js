var DataTypes = require("sequelize").DataTypes;
var _category = require("./category");
var _dev_category = require("./dev_category");
var _dev_menu = require("./dev_menu");
var _dev_user = require("./dev_user");
var _menu = require("./menu");
var _user = require("./user");

function initModels(sequelize) {
  var category = _category(sequelize, DataTypes);
  var dev_category = _dev_category(sequelize, DataTypes);
  var dev_menu = _dev_menu(sequelize, DataTypes);
  var dev_user = _dev_user(sequelize, DataTypes);
  var menu = _menu(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  dev_menu.belongsTo(dev_category, { as: "category_", foreignKey: "category_id"});
  dev_category.hasMany(dev_menu, { as: "dev_menus", foreignKey: "category_id"});
  menu.belongsTo(category, { as: "category_", foreignKey: "category_id"});
  category.hasMany(menu, { as: "menus", foreignKey: "category_id"});

  return {
    category,
    dev_category,
    dev_menu,
    dev_user,
    menu,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
