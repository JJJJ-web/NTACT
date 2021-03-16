const {Sequelize, Op} = require('sequelize');
const orderModel = require('../../models').dev_orders;

exports.list = async (ctx) => {
    const {status} = ctx.params;
    
    let list;
    try {
        list = await orderModel.findAll({
            attributes: ['id', 'buyer_name', 'order_detail', 'date', 'order_stat'],
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

exports.status = async (ctx) => {
    // id 파라미터를 받아 해당 주문 DB 찾아오기 
    const {id} = ctx.params;
    const status = ctx.request.body.headers.status;
    let order;

    try {
        order = await orderModel.findByPk(id);
    } catch (e) {
        ctx.throw(500, e);
    }

    // 해당 주문을 headers에 있는 status로 변경
    if(order.order_stat) {
        try {
            orderModel.update({order_stat: status}, {where: {id: id}});
        } catch (e) {
            ctx.throw(500, e);
        }
    } ctx.status = 200;
};
