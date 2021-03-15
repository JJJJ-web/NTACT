const {Sequelize, Op} = require('sequelize');
const orderModel = require('../../models').dev_orders;

exports.list = async (ctx) => {
    const {status} = ctx.params;
    
    let list;
    try {
        list = await orderModel.findAll({
            attributes: ['buyer_name', [Sequelize.json('order_detail.cart'), 'order_detail'], 'date', 'order_stat'],
            where: {
                order_stat: status,
                date: {
                    [Op.gt]: new Date().setHours(0, 0, 0, 0), // midnight today
                    [Op.lte]: new Date(), // now
                },
            },
            order: [['date', 'ASC']],
        });
    } catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = list;
};
