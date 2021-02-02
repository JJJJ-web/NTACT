// modules
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const users = new Router();

// /users/~ 뒤에 추가 된 경로
// 현재는 모두 기능은 없고 해당 경로가 출력되게 만들어 놓았습니다. 
users.get('/', ctrl.index);
users.get('/:id', ctrl.show);
users.delete('/:id', ctrl.destroy);
users.post('/', ctrl.create);
users.put('/:id', ctrl.update);
users.get('/loginKakao', ctrl.loginKakao);

module.exports = users;