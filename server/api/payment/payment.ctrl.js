const axios = require('axios');
const paymentConfig = require('../../config/payment-config.json');
const orderModel = require('../../models').dev_orders;

exports.create = async (ctx) => {
    const cart = ctx.request.body;
    const totalOrderQuantity = cart['cart'].length;

    let name;
    if (totalOrderQuantity === 1) {
        name = cart['cart'][0]['name_kor'];
    } else if (totalOrderQuantity > 1) {
        name = `${cart['cart'][0]['name_kor']} 외 ${(totalOrderQuantity - 1).toString()}`;
    }

    const date = new Date().toISOString().substr(0, 10).split('-').join('').toString();
    const order = new orderModel({
        id: `${date}_${new Date().getTime()}`,
        amount: cart['sum'],
        name: name,
        buyer_name: '홍길동',
        buyer_tel: '01012341234',
        order_stat: 0,
        dev_merchant_id: 1,
    });

    try {
        await order.save(); // 데이터베이스에 실제로 데이터를 작성
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = {order_id: order['id'], order_name: order['name']};
};

exports.complete = async (ctx) => {
    try {
        const {impUid} = ctx.request.body;

        const getToken = await axios({ // access token 발급
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: {
                imp_key: paymentConfig.imp_key,
                imp_secret: paymentConfig.imp_secret,
            },
        });
        const {accessToken} = getToken.data.response; // 인증 토큰

        const getPaymentData = await axios({ // 결제 정보 조회
            url: `https://api.iamport.kr/payments/\${impUid}`,
            method: 'get',
            headers: {'Authorization': accessToken},
        });
        const paymentData = getPaymentData.data.response;
        console.log(paymentData);
    } catch (e) {
        ctx.status = 400;
        ctx.body = e;
    }
};