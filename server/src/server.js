const app = require('./index');
const syncDb = require('./sync-db');
const httpServer = require('http').createServer(app.callback());
const options = { /* ... */ };
const io = require('socket.io')(httpServer, options);

io.on('connection', (socket) => {
    console.log(`connect! ${socket}`);
});

// DB 연동 후 서버 구동
syncDb().then((_)=> {
    console.log('Sync database!');
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`HTTPServer is running on ${PORT} port`);
    });
});