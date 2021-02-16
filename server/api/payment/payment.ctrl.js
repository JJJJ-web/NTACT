const axios = require('axios');
const paymentConfig = require('../../config/payment-config.json');

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
        const paymentData = getPaymentData.data.resource;
        console.log(paymentData);
    } catch (e) {
        ctx.status = 400;
        ctx.body = e;
    }
};