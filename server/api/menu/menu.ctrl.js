const {Sequelize} = require('sequelize');
const menuModel = require('../../models').dev_menu;
const categoryModel = require('../../models').dev_category;

menuModel.belongsTo(categoryModel, {foreignKey: 'category_id', sourceKey: 'id'});
categoryModel.hasMany(menuModel, {foreignKey: 'category_id', targetKey: 'id'});

exports.list = async (ctx) => {
    let menus;
    const {category, onSale} = ctx.request.query;
    JSON.stringify(category, onSale);

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
    } else if (onSale === 'true') {
        try {
            menus = await menuModel.findAll({
                where: {sales_stat: 1},
            });
        } catch (e) {
            ctx.throw(500, e);
        }
    } else {
        try {
            menus = await menuModel.findAll();
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

exports.saleStat = async (ctx) => {
    // id 파라미터를 받아 해당 메뉴 찾아오기 
    const {id} = ctx.params;

    let menu;
    try {
        menu = await menuModel.findByPk(id);
    } catch (e) {
        ctx.throw(500, e);
    }

    // 해당 메뉴 ST가 1일 경우 sales_stat 0으로 변경
    if(menu.sales_stat) {
        try {
            menuModel.update({sales_stat: 0}, {where: {id: id}});
        } catch (e) {
            ctx.throw(500, e);
        }
    } else {
        try {
            menuModel.update({sales_stat: 1}, {where: {id: id}});
        } catch (e) {
            ctx.throw(500, e);
        }
    } ctx.status = 200;
};

exports.status = async (ctx) => {
    // menu Object를 받아 해당 메뉴를 stat을 수정 
    const menu = ctx.request.body.headers.menu;
    console.log(menu);

    try {
        await menuModel.findOne({where: {id: menu.id}})
            .then((findMenu) => {
                findMenu.name_kor = `${menu.menu_kor}`;
                findMenu.name_eng = `${menu.menu_eng}`;
                findMenu.price = `${menu.price}`;
                findMenu.save()
                    .then(() => {
                        ctx.status = 200;
                        console.log('메뉴수정성공');
                    });
            });
    } catch (e) {
        ctx.throw(500, e);
    }
};