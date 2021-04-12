// modules
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const users = new Router();


// 고객 카카오 로그인
users.post('/kakao', ctrl.kakao);

// 고객 구글 로그인
users.post('/google', ctrl.google);

// 주방관리자 로그인
users.post('/chef', ctrl.chef);

// 관리자 로그인
users.post('/admin', ctrl.admin);

module.exports = users;