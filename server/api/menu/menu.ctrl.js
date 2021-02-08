const menuModel = require('../../models').Menu;

exports.list = async (ctx) => {
    let menus;
    try {
        menus = await menuModel.findAll({
            attributes: ['id', 'name_kor', 'name_eng', 'price', 'img_url', 'sales_stat', 'category_id'],
        });
    } catch (e) {
        ctx.throw(500, e);
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