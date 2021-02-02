const Router = require('koa-router');

const api = new Router();
const users = require('./user');

// api/users/~ 경로들은 users 모듈에서 사용
api.use('/users', users.routes());

module.exports = api;
