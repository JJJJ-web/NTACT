// modules
const Koa = require('koa');
const Router = require('koa-router');
const wifi = require('node-wifi');
const wifiInfo = require('../config/wifi-info.json');
const open = require('open');

const app = new Koa();
const router = new Router();

router.get('/', (ctx) => {
  wifi.init({
    iface: null,
  });

  // Connect to a network
  wifi.connect({ ssid: wifiInfo.ssid, password: wifiInfo.password }, (error) => {
    if (error) {
      console.log(error);
    }
    console.log(`Wifi ${wifiInfo.ssid} Connected`);
    open('http://localhost:3000');
  });
  ctx.body = 'Connecting wifi...';
});

// app 인스턴스에 라우터 적용
app.use(router.routes()).use(router.allowedMethods());

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Wifi-connector is running on ${PORT} port`);
});

module.exports = app;