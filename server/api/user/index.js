// modules
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const users = new Router();

// /users~ 뒤에 추가 된 경로
users.get('/', ctrl.index);

// 카카오 로그인
users.post('/kakao', ctrl.kakao);

// 구글 로그인
users.post('/google', ctrl.google);


module.exports = users;