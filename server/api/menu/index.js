// modules
const Router = require('koa-router');
const menusCtrl = require('./menu.ctrl');

const menus = new Router();

// 판매 중인 메뉴 조회
menus.get('/', menusCtrl.list);
// 새로운 메뉴 생성
menus.post('/', menusCtrl.create);
// 특정 메뉴에 대한 상세 정보 조회
menus.get('/:id', menusCtrl.get);
// 특정 메뉴에 대한 sales_stat 변경 
menus.patch('/status/:id', menusCtrl.saleStat);
// 특정 메뉴에 대한 delay_time 변경 
menus.patch('/delaytime/:id', menusCtrl.delayTime);
// 특정 메뉴에 대한 전체 stat 변경 
menus.put('/status', menusCtrl.status);
// 특정 메뉴 삭제  
menus.delete('/:id', menusCtrl.delete);

module.exports = menus;