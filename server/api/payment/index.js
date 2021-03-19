// modules
const Router = require('koa-router');
const paymentsCtrl = require('./payment.ctrl');

const payments = new Router();

// 프론트에서 넘겨준 결제 정보 받기
payments.post('/order', paymentsCtrl.create);
// 결제 위변조 검증 및 데이터 동기화
payments.post('/iamport-webhook', paymentsCtrl.complete);
// 모바일 웹 환경에 대응하는 api 및 서버 로직
payments.get('/complete/mobile', paymentsCtrl.complete);
// 결제 내역
payments.post('/:id', paymentsCtrl.find);
// 상세 결제 내역
payments.post('/:id/:selected', paymentsCtrl.find);

module.exports = payments;