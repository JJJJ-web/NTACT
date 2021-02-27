// modules
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const users = new Router();

// /users~ 뒤에 추가 된 경로
users.get('/', ctrl.index);

users.post('/loginKakao', ctrl.loginKakao);

users.post('/loginGoogle', ctrl.loginGoogle);


module.exports = users;