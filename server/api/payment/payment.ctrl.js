const axios = require('axios');
const {Op} = require('sequelize');
const paymentConfig = require('../../config/payment-config.json');
const orderModel = require('../../models').dev_orders;
const menuModel = require('../../models').dev_menu;

exports.create = async (ctx) => {
    const cart = ctx.request.body;
    const totalOrderItems = cart['cart'].length;
    const outOfStocks = [];
    let name;
    let totalOrderQuantity = 0;

    // 주문 내역 중 품절된 메뉴가 있는지 체크
    for (let i = 0; i < totalOrderItems; i++) {
        const item = await menuModel.findByPk(cart['cart'][i].Id);
        if (item.sales_stat === 0) {
            outOfStocks.push(item.id);
        }
    }
    if (outOfStocks.length > 0) {
        ctx.status = 409;
        ctx.body = outOfStocks;
        return;
    }

    for (let i = 0; i < totalOrderItems; i++) {
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
        buyer_id: cart['buyer_id'],
        pay_method: 'card',
        order_stat: 'uncharged',
        order_type: cart['order_type'],
        order_detail: cart['cart'],
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
            order.order_stat = 'ready';
            order.payment = paymentData;
            await order.save();

            ctx.body = {
                status: 'success',
                message: '일반 결제 성공',
                buyer_name: order.buyer_name,
                order_id: order.id,
                order_name: order.name,
                order_detail: order.order_detail,
                order_type: order.order_type,
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

exports.refund = async (ctx) => {
    try {
        // access token 발급
        const getToken = await axios({
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            data: {
                imp_key: paymentConfig.imp_key,
                imp_secret: paymentConfig.imp_secret,
            },
        });
        const accessToken = getToken.data.response.access_token;

        // 결제 정보 조회
        const {body} = ctx.request;
        const merchantUid = body.merchant_uid;
        const order = await orderModel.findByPk(merchantUid);
        if (order === null) {
            ctx.status = 404;
            ctx.body = 'Order not found!!!';
        }
        const paymentData = order.payment; // 조회된 결제 정보
        const impUid = paymentData.imp_uid;
        const amount = paymentData.amount;
        const cancelAmount = paymentData.cancel_amount;
        const cancelableAmount = amount - cancelAmount; // 환불 가능 금액(= 결제금액 - 환불된 총 금액) 계산
        if (cancelableAmount <= 0) {
            ctx.status = 400;
            ctx.json = {message: '이미 전액환불된 주문입니다.'};
        }

        // 결제 환불 요청
        const getCancelData = await axios({
            url: 'https://api.iamport.kr/payments/cancel',
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': accessToken,
            },
            data: {
                imp_uid: impUid, // 환불 고유 번호
                checksum: cancelableAmount, // 환불 가능 금액
            },
        });
        const {response} = getCancelData.data; // 환불 결과

        // 환불 결과 동기화
        const refundId = response.merchant_uid;
        const refund = await orderModel.findByPk(refundId);
        if (!refund) {
            throw Error(`Order requested a refund ${id} does not exist.`);
        }
        refund.order_stat = 'canceled';
        refund.payment = response;
        await refund.save();

        ctx.body = refund;
    } catch (error) {
        ctx.status = 400;
        ctx.body = error;
    }
};

exports.find = async (ctx) => {
    const {id, selected} = ctx.params;
    let history;
    if (typeof selected === 'undefined') {
        try {
            history = await orderModel.findAll({
                attributes: ['id', 'name', 'amount', 'date', 'order_type', 'order_stat'],
                where: {
                    buyer_id: id,
                    [Op.not]: [
                        {order_stat: 'uncharged'},
                    ],
                },
                order: [['date', 'DESC']],
            });
        } catch (e) {
            ctx.throw(500, e);
        }
        // 결제 내역이 존재하지 않으면
        if (history.length === 0) {
            ctx.status = 204;
            return;
        }
    } else {
        try {
            history = await orderModel.findOne({
                attributes: ['id', 'name', 'amount', 'date', 'order_detail', 'order_stat', 'order_type'],
                where: {
                    buyer_id: id,
                    id: selected,
                },
            });
        } catch (e) {
            ctx.throw(500, e);
        }
    }
    ctx.body = history;
};