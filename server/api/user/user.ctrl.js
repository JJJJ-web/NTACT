const models = require('../../models');

exports.index = (ctx) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

exports.loginKakao = (ctx) => {
    const Authorization = ctx.request.headers[Authorization];
    ctx.body = `${ctx.method} ${ctx.path} 헤더: ${Authorization}`;
    console.log(Authorization); 
};