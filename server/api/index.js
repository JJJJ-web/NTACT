const Router = require('koa-router');

const api = new Router();
const users = require('./user');
const menus = require('./menu');
const categories = require('./category');
const payments = require('./payment');
const orders = require('./order');

// api/users/~ 경로들은 users 모듈에서 사용
api.use('/users', users.routes());
api.use('/menus', menus.routes());
api.use('/categories', categories.routes());
api.use('/payments', payments.routes());
api.use('/orders', orders.routes());

module.exports = api;
