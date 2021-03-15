// modules
const Router = require('koa-router');
const ordersCtrl = require('./order.ctrl');

const orders = new Router();

// 주문 상태에 따라 주문 내역 조회
orders.get('/:status', ordersCtrl.list);
// 특정 주문 주문 상태 변경
orders.patch('/:id', ordersCtrl.status);

module.exports = orders;