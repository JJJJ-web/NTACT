const axios = require('axios');
const paymentConfig = require('../../config/payment-config.json');
const orderModel = require('../../models').dev_orders;

exports.create = async (ctx) => {
    const cart = ctx.request.body;
    let name;
    let totalOrderQuantity = 0;
    for (let i = 0; i < cart['cart'].length; i++) {
        totalOrderQuantity += cart['cart'][i].Quantity;
    }

    if (totalOrderQuantity === 1) {
        name = cart['cart'][0]['Name'];
    } else if (totalOrderQuantity > 1) {
        name = `${cart['cart'][0]['Name']} 외 ${(totalOrderQuantity - 1).toString()}`;
    }

    const date = new Date().toISOString().substr(0, 10).split('-').join('').toString();
    const order = new orderModel({
        id: `${date}_${new Date().getTime()}`,
        amount: cart['sum'],
        name: name,
        pay_method: 'card',
        order_stat: 0,
        order_detail: cart,
        dev_merchant_id: 1,
    });

    try {
        await order.save(); // 데이터베이스에 실제로 데이터를 작성
    } catch (e) {
        return ctx.throw(500, e);
    }
    ctx.body = order['id'];
};

exports.complete = async (ctx) => {
    try {
        const impUid = ctx.request.body.imp_uid;
        const merchantUid = ctx.request.body.merchant_uid;

        const getToken = await axios({ // access token 발급
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: {
                imp_key: paymentConfig.imp_key,
                imp_secret: paymentConfig.imp_secret,
            },
        });
        const accessToken = getToken.data.response.access_token; // 인증 토큰

        const getPaymentData = await axios({ // 결제 정보 조회
            url: `https://api.iamport.kr/payments/${impUid}`,
            method: 'get',
            headers: {'Authorization': accessToken},
        });
        const paymentData = getPaymentData.data.response;

        // DB에서 결제되어야 하는 금액 조회
        const order = await orderModel.findByPk(paymentData.merchant_uid);
        const amountToBePaid = order.amount;

        // 결제 검증하기
        const amount = paymentData.amount;
        if (amount === amountToBePaid) { // 위변조 되지 않았으면 DB에 결제 정보 업데이트
            const order = await orderModel.findOne({where: {id: merchantUid}});
            if (!order) {
                throw Error(`Order ${id} does not exist.`);
            }
            order.buyer_name = paymentData.buyer_name;
            order.buyer_tel = paymentData.buyer_tel;
            order.payment = paymentData;
            await order.save();

            ctx.body = {
                status: 'success',
                message: '일반 결제 성공',
                buyer_name: order.buyer_name,
                order_name: order.name,
                order_detail: order.order_detail.cart,
                total_price: order.amount,
                order_date: order.date.toLocaleString(),
            };
        } else { // 위변조된 결제
            throw {status: 'forgery', message: '위조된 결제시도'};
        }
    } catch (e) {
        ctx.status = 400;
        ctx.body = e;
    }
};