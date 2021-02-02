const models = require('../../models');

exports.index = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;

    // req.query.limit = req.query.limit || 10;
    // const limit = parseInt(req.query.limit, 10);
    // if (Number.isNaN(limit)) {
    //     return res.status(400).end();
    // }

    // models.User
    //     .findAll({
    //         limit: limit
    //     })
    //     .then(users => {
    //         res.json(users);
    //     });
};

exports.show = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;

    // const id = parseInt(req.params.id, 10);
    // if (Number.isNaN(id)) return res.status(400).end();

    // models.User.findOne({
    //     where: { id }
    // }).then(user => {
    //     if (!user) return res.status(404).end();
    //     res.json(user);
    // });
};

exports.destroy = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;

    // const id = parseInt(req.params.id, 10);
    // if (Number.isNaN(id)) return res.status(400).end();

    // models.User.destroy({
    //     where: { id }
    // }).then(() => {
    //     res.status(204).end();
    // });
};

exports.create = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;

    // const name = req.body.name;
    // if (!name) return res.status(400).end();

    // models.User.create({ name })
    //     .then(user => {
    //         res.status(201).json(user);
    //     })
    //     .catch(err => {
    //         if (err.name === 'SequelizeUniqueConstraintError') {
    //             return res.status(409).end();
    //         }
    //         res.status(500).end();
    //     })
};

exports.update = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;

    // const id = parseInt(req.params.id, 10);
    // if (Number.isNaN(id)) return res.status(400).end();

    // const name = req.body.name;
    // if (!name) return res.status(400).end();


    // if (isConflict) return res.status(409).end();


    // models.User.findOne({ where: { id } })
    //     .then(user => {
    //         if (!user) return res.status(404).end();

    //         user.name = name;
    //         user.save()
    //             .then(_ => {
    //                 res.json(user);
    //             })
    //             .catch(err => {
    //                 if (err.name === 'SequelizeUniqueConstraintError') {
    //                     return res.status(409).end();
    //                 }
    //                 res.status(500).end();
    //             })
    //     })
};


exports.loginKakao = (ctx, next) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;

//    const { code } =  ctx.request.query;
//    ctx.body = `${ctx.request.method} ${ctx.request.path} 카카오 인증코드: ` + code;
//    console.log(code); 
};