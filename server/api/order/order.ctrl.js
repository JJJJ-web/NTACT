const { Op } = require('sequelize');
const orderModel = require('../../models').dev_orders;
const RedisClient = require('../../redis');
const server = require('../../src/server');

exports.list = async (ctx) => {
  const { status } = ctx.params;
    
  let list;
  try {
    list = await orderModel.findAll({
      attributes: ['id', 'buyer_id', 'buyer_name', 'order_detail', 'date', 'order_stat', 'order_type'],
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
  // 주문 id 파라미터를 받아 해당 주문 DB 찾아오기
  
  const { orderID } = ctx.params;
  const { status } = ctx.request.body.headers;
  const { userID } = ctx.request.body.headers;
  let order;

  try {
    order = await orderModel.findByPk(orderID);
  } catch (e) {
    ctx.throw(500, e);
  }

  // 해당 주문을 headers에 있는 status로 변경
  if(order.order_stat) {
    try {
      orderModel.update({ order_stat: status }, { where: { orderID } });
    } catch (e) {
      ctx.throw(500, e);
    }
  } 
  // 레디스에서 userID를 통해 socketID를 찾는다.
  RedisClient.get(userID, (err, value) => {
    if(err) console.log(err);
    // ID를 통해 해당 소켓에게 C 이벤트를 송신한다.
    server.io.to(value).emit('C');
    console.log(`소켓ID:${value}에게 소켓이벤트 C (주문상태 변동) 전송`); 
  });

  ctx.status = 200;
};
