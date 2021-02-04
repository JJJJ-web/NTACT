const models = require('../../models');

exports.index = (ctx) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

exports.loginKakao = (ctx) => {
    // header로 보낸 request payload를 접근하려면 body로 접근
    const token = ctx.request.body.headers.Authorization;
    console.log(`access token : ${token}`);
};