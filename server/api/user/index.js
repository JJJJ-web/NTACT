// modules
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const users = new Router();

// /users/~ 뒤에 추가 된 경로
// 현재는 모두 기능은 없고 해당 경로가 출력되게 만들어 놓았습니다. 
users.get('/', ctrl.index);

users.post('/loginKakao', ctrl.loginKakao);


module.exports = users;