// modules
const Router = require('koa-router');
const ordersCtrl = require('./order.ctrl');

const orders = new Router();

// 주문 상태에 따라 주문 내역 조회
orders.get('/:status', ordersCtrl.list);

module.exports = orders;