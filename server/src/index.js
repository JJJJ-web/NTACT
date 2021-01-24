// modules
const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const path = require('path');

const app = new Koa();
const router = new Router();

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