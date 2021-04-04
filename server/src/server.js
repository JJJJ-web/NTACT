const app = require('./index');
const syncDb = require('./sync-db');
const httpServer = require('http').createServer(app.callback());
const options = {
    cors: {
        origin: ['http://localhost:3000'],
        methods: ['GET', 'POST'],
    },
};
const io = require('socket.io')(httpServer, options);
const redis = require('redis');
const client = redis.createClient();

client.on('error', (error) => {
    // 레디스 서버 안켜져 있을 경우 에러 메세지 출력.
    console.error(error);
});

// 소켓이 연결 되었을 경우
io.on('connection', (socket) => {
    console.log(`소켓 연결 성공 | 소켓: ${socket.id}`);

    // 로그인 후 해당 유저 ID 와 socket ID를 Redis에 저장.
    // 해당 소켓을 client Room에 join 
    socket.on('A', (data) => {
        // 'client' room에 넣는다. 
        socket.join('client');
        
        // redis에 userID와 socketID를 저장한다.
        client.set(data.socketID, data.userID, redis.print);
        
        // redis에 들어갔는지 확인용 삭제될 코드 
        client.get(data.userID, (err, value) => {
            if(err) console.log(err);
            console.log(`레디스 에서 가져온 ${data.userID}에 해당하는 value값: ${value}`);
        });
    });

    // 소켓 연결 해제
    socket.on('disconnect', () => {
        console.log(`소켓 연결 해제 | 소켓: ${socket.id}`);
        socket.leave('client');
        // redis에 해당 소켓id가 key값에 있을 경우 해당 key-value 삭제.
        if(client.exists(socket.id)) client.del(socket.id, redis.print);
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