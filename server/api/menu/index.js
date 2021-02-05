// modules
const Router = require('koa-router');
const menusCtrl = require('./menu.ctrl');

const menus = new Router();

// 메뉴 조회
menus.get('/', menusCtrl.list);
// 특정 메뉴에 대한 상세 정보 조회
menus.get('/:id', menusCtrl.get);

module.exports = menus;