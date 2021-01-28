// modules
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');
const mysql = require('mysql');
const dbConfig = require('../config/db-config.json');

const app = new Koa();
const router = new Router();

//sequelize 버전
//const sequelize = require('../models').sequelize;   // mysql 시퀄라이저 모델


// 데이터베이스 연결
const database = mysql.createConnection(dbConfig);
database.connect();

// 데이터베이스 조회
database.query('SELECT * FROM menu', function (error, results) {
    if (error) {
        console.log(error);
    }
    console.log(results);
});

database.end();

// 라우터 설정
router.get('/payment', (ctx, next) => {
    ctx.body = '결제';
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

// 정적 파일 제공
app.use(serve(path.join(__dirname, '../../client')));

app.listen(4000, () => {
    console.log('Listening to port 4000');
});