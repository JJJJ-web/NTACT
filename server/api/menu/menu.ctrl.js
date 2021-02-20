const {Sequelize} = require('sequelize');
const menuModel = require('../../models').dev_menu;
const categoryModel = require('../../models').dev_category;

menuModel.belongsTo(categoryModel, {foreignKey: 'category_id', sourceKey: 'id'});
categoryModel.hasMany(menuModel, {foreignKey: 'category_id', targetKey: 'id'});

exports.list = async (ctx) => {
    let menus;
    try {
        menus = await menuModel.findAll({
            attributes: {exclude: 'descriptions'},
            where: {sales_stat: 1},
        });
    } catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = menus;
};

exports.all = async (ctx) => {
    let menus;
    const {category} = ctx.request.query;
    JSON.stringify(category);

    if (category === 'true') {
        try {
            menus = await menuModel.findAll({
                attributes: ['id', ['name_kor', 'menu_kor'], ['name_eng', 'menu_eng'], 'price',
                    'description', 'img_url', 'sales_stat', 'category_id',
                    [Sequelize.col('dev_category.name_kor'), 'category_kor'],
                    [Sequelize.col('dev_category.name_eng'), 'category_eng']],
                include: [{
                    model: categoryModel,
                    attributes: [],
                    required: true,
                }],
            });
        } catch (e) {
            ctx.throw(500, e);
        }
    } else {
        try {
            menus = await menuModel.findAll({
                attributes: {exclude: 'descriptions'},
            });
        } catch (e) {
            ctx.throw(500, e);
        }
    }
    ctx.body = menus;
};

exports.get = async (ctx) => {
    const {id} = ctx.params;
    let menu;
    try {
        menu = await menuModel.findByPk(id);
    } catch (e) {
        ctx.throw(500, e);
    }
    // 메뉴가 존재하지 않으면
    if (!menu) {
        ctx.status = 404;
        ctx.body = {message: 'menu not found'};
        return;
    }
    ctx.body = menu;
};