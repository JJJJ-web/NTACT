const redis = require('redis');
const app = require('./index');
const syncDb = require('./sync-db');
const httpServer = require('http').createServer(app.callback());

const options = {
  cors: {
    origin: ['http://ntact.site:3000',
      'http://admin.ntact.site:3000',
      'http://kitchen.ntact.site:3000'],
    methods: ['GET', 'POST'],
  },
};
const io = require('socket.io')(httpServer, options);


const client = redis.createClient();

client.on('error', (error) => {
  // 레디스 서버 안켜져 있을 경우 에러 메세지 출력.
  console.error(error);
});

// 소켓이 연결 되었을 경우
io.on('connection', (socket) => {
  console.log(`소켓 연결 성공 | 소켓: ${socket.id}`);

  // 로그인 후 해당 유저 ID 와 socket ID를 Redis에 저장.
  // 해당 소켓을 해당 role 방에 넣는다. 
  socket.on('A', (data) => {
    // 소켓의 role에 해당하는 room에 넣는다. 
    socket.join(`${data.role}`);
    console.log(`소켓: ${socket.id} ${data.role} room에 들어감`);
    // redis에 userID와 socketID를 저장한다.
    client.set(data.userID, data.socketID, redis.print);
        
    // redis에 들어갔는지 확인용 삭제될 코드 
    client.get(data.userID, (err, value) => {
      if(err) console.log(err);
      console.log(`레디스에서 가져온 결과 | key(userID): ${data.userID}에 해당하는 value(socketID): ${value}`);
    });
  });

  // 해당 주문 상태변경시 오는 이벤트
  socket.on('B', (data) => {
    // 레디스에서 userID를 통해 socketID를 찾는다.
    client.get(data.userID, (err, value) => {
      if(err) console.log(err);
      // ID를 통해 해당 소켓에게 C 이벤트를 송신한다.
      io.to(value).emit('C');
      console.log(`소켓ID:${value}에게 소켓이벤트 C (주문상태 변동) 전송`); 
    });
  });

  // 메뉴 상태 변경시 오는 이벤트
  socket.on('D', () => {
    // 'client' 룸에 있는 모든 소켓에게 이벤트 E 전송
    io.in('client').emit('E');
    console.log('client room에 있는 전체 고객 소켓에게 소켓이벤트 E 전송'); 
  });

  // 결제 성공하여 새로운 주문 발생시 오는 이벤트
  socket.on('F', () => {
    // 'chef' 룸에 있는 모든 소켓에게 이벤트 G 전송
    io.in('chef').emit('G');
    console.log('chef room에 있는 주방관리자 소켓들에게 소켓이벤트 G 전송'); 
  });

  // 소켓 연결 해제
  socket.on('disconnect', () => {
    console.log(`소켓 ${socket.id} 연결 해제`);
    // redis에 해당 소켓id가 key값으로 있을 경우 해당 key-value 전체 삭제.
    if(client.exists(socket.id)) client.del(socket.id, redis.print);
  });
});

// DB 연동 후 서버 구동
syncDb().then((_) => {
  console.log('Sync database!');
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`HTTPServer is running on ${PORT} port`);
  });
});