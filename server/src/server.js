const app = require('./index');
const syncDb = require('./sync-db');
const httpServer = require('http').createServer(app.callback());
const options = { /* ... */ };
const io = require('socket.io')(httpServer, options);

// 소켓이 연결 되었을 경우
io.on('connection', (socket) => {
    console.log(`소켓 연결 성공 | 소켓: ${socket}`);

    // 소켓 연결 해제
    socket.on('disconnect', () => {
        console.log(`소켓 연결 해제 | 소켓: ${socket}`);
    });
});

// DB 연동 후 서버 구동
syncDb().then((_)=> {
    console.log('Sync database!');
    const PORT = process.env.PORT || 4000;
    httpServer.listen(PORT, () => {
        console.log(`HTTPServer is running on ${PORT} port`);
    });
});