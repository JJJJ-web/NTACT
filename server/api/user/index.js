// modules
const Koa = require('koa');
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const router = new Router();

// /users/~ 뒤에 추가 된 경로
router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id',ctrl.update);
router.post('/loginKakao', ctrl.loginKakao);

module.exports = router;