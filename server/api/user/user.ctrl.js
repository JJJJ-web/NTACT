const models = require('../../models');

exports.index = (ctx) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

exports.loginKakao = (ctx) => {
    const {code} = ctx.request.query;
    ctx.body = `${ctx.method} ${ctx.path} 카카오코드: ${code}`;
    console.log(code); 
};