// modules
const Koa = require('koa');
const Router = require('koa-router');
const ctrl = require('./user.ctrl');

const router = new Router();

router.get('/', ctrl.index);
router.get('/:id', ctrl.show);
router.delete('/:id', ctrl.destroy);
router.post('/', ctrl.create);
router.put('/:id',ctrl.update);

module.exports = router;