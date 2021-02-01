// modules
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');

// api module
const api = require('../api');

// const mysql = require('mysql');
// const dbConfig = require('../config/db-config.json');

const app = new Koa();
const router = new Router();

// 데이터베이스 연결
// const database = mysql.createConnection(dbConfig);
// database.connect();

// 데이터베이스 조회
// database.query('SELECT * FROM menu', function (error, results) {
//     if (error) {
//         console.log(error);
//     }
//     console.log(results);
// });

// database.end();

// 라우터 설정
router.get('/payment', (ctx, next) => {
    ctx.body = '결제';
    next();
});

// /api/~ 경로들은 API들은 모듈에서 사용 
router.use('/api', api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// 정적 파일 제공
//app.use(serve(path.join(__dirname, '../../client')));

module.exports = app;
