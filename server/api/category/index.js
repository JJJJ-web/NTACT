// modules
const Router = require('koa-router');
const categoriesCtrl = require('./category.ctrl');

const categories = new Router();

// 카테고리 조회
categories.get('/', categoriesCtrl.list);
// 카테고리 생성
categories.post('/', categoriesCtrl.create);

module.exports = categories;