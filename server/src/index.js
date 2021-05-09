// modules
const Koa = require('koa');
const Router = require('koa-router');
const cors = require('@koa/cors');
const bodyParser = require('koa-bodyparser');
// api module
const api = require('../api');

const app = new Koa();
const router = new Router();

// cors()를 사용하여 클라이언트 도메인에만 접근을 허용했습니다. 
const corsOption = {
  origin: ['http://ntact.site:3000',
    'http://admin.ntact.site:3000',
    'http://kitchen.ntact.site:3000'],
};

app.use(cors(corsOption));



// HTTP header 부분을 text로 변환해줍니다. ctx.body로 접근가능합니다.
// json, text, form 형태로 반환해줍니다.
app.use(bodyParser({ enableTypes: ['json', 'text', 'form'] }));

// /api/~ 경로들은 api 모듈에서 사용
router.use('/api', api.routes());

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

module.exports = app;
