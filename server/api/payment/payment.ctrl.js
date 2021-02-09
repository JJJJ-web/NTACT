const axios = require('axios');
const paymentConfig = require('../../config/payment-config.json');

exports.complete = async (ctx) => {
    try {
        const getToken = await axios({ // access token 발급
            url: 'https://api.iamport.kr/users/getToken',
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            data: {
                imp_key: paymentConfig.imp_key,
                imp_secret: paymentConfig.imp_secret,
            },
        });
    } catch (e) {
        ctx.status = 400;
        ctx.body = e;
    }
};