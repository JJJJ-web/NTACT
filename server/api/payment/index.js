// modules
const Router = require('koa-router');
const paymentsCtrl = require('./payment.ctrl');

const payments = new Router();

// 프론트에서 넘겨준 결제 정보 받기
payments.post('/order', paymentsCtrl.create);
// 결제 위변조 검증 및 데이터 동기화
payments.post('/complete', paymentsCtrl.complete);

module.exports = payments;