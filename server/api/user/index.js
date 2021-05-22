// modules
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const users = new Router();


// 고객 카카오 로그인
users.post('/kakao', ctrl.kakao);

// 고객 구글 로그인
users.post('/google', ctrl.google);

// 고객 비회원 로그인
users.post('/anonymous', ctrl.anonymous);

// 근무자 통합 로그인
users.post('/staff', ctrl.staff);

module.exports = users;