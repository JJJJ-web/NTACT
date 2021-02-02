// modules
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');

// api module
const api = require('../api');

const app = new Koa();
const router = new Router();

// /api/~ 경로들은 api 모듈에서 사용
router.use('/api', api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// 정적 파일 제공
app.use(serve(path.join(__dirname, '../../client')));

module.exports = app;
