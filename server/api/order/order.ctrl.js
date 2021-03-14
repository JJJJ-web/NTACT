const orderModel = require('../../models').dev_orders;

exports.list = async (ctx) => {
    const {status} = ctx.params;
    let list;
    try {
        list = await orderModel.findAll({
            attributes: ['buyer_name', 'order_detail', 'date', 'order_stat'],
            where: {order_stat: status},
            order: [['date', 'ASC']],
        });
    } catch (e) {
        ctx.throw(500, e);
    }
    ctx.body = list;
};
