// modules
const Router = require('koa-router');
const paymentsCtrl = require('./payment.ctrl');

const payments = new Router();

// 결제 위변조 검증 및 데이터 동기화
payments.post('/payments/complete', paymentsCtrl.complete);

module.exports = payments;