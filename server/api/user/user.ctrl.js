const models = require('../../models');
const axios = require('axios');

function getUserDB(kakaoToken) {
    axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            'Authorization': `Bearer ${kakaoToken}`,
        },
    })
        .then(function (response) {
            console.log(response.data);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            return;
        });
}

exports.index = (ctx) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

exports.loginKakao = (ctx) => {
    // header로 보낸 request payload를 접근하려면 body로 접근
    const kakaoToken = ctx.request.body.headers.Authorization;
    console.log(`access token : ${kakaoToken}`);

    getUserDB(kakaoToken);
};

