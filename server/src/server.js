const app = require('./index');
const syncDb = require('./sync-db');
const httpServer = require('http').createServer(app.callback());
const RedisClient = require('../redis');

httpServer.keepAliveTimeout = 65000;
httpServer.headersTimeout = 66000;

RedisClient.on('error', (error) => {
  // 레디스 서버 안켜져 있을 경우 에러 메세지 출력.
  console.error(error);
});

const options = {
  cors: {
    origin: ['https://ntact.site',
      'https://manager.ntact.site',
      'http://localhost:3000',
      'http://localhost:3001',
      'http://tmp.ntact.site:3000',
      'http://tmp.kitchen.ntact.site:3000'],
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  },
};
const io = require('socket.io')(httpServer, options);

// 소켓이 연결 되었을 경우
io.on('connection', (socket) => {
  // console.log(`소켓 연결 성공 | 소켓ID: ${socket.id}`);

  // 초기화면 접속 (미로그인)상태에 있는 ready 방에 넣는다.
  socket.join('ready');

  // 로그인 후 해당 유저 ID 와 socket ID를 Redis에 저장.
  // 해당 소켓을 해당 role 방에 넣는다.
  socket.on('A', (data) => {
    // 로그인 진행을 눌렀음으로 ready 방에서 뺀다.
    socket.leave('ready');
    // console.log(`data.role: ${data.role}`);
    // client이면 client room 아니면 staff room에 넣는다.
    if(data.role === 'client') {
      // console.log('client room 입장');
      socket.join(`${data.role}`);
      // redis에 userID와 socketID를 저장한다.
      RedisClient.setex(data.userID, 600, data.socketID);

      // // redis에 들어갔는지 확인용 삭제될 코드
      // RedisClient.get(data.userID, (err, value) => {
      //   if(err) console.log(err);
      //   // console.log(`레디스에 넣습니다 | key(userID): ${data.userID}에 해당하는 value(socketID): ${value}`);
      // });
    } else if(data.role === 'chef' || data.role === 'admin') {
      // console.log('staff room 입장');
      socket.join('staff');
    }
  });

  // 해당 주문 상태변경시 오는 이벤트
  socket.on('B', (data) => {
    // 레디스에서 userID를 통해 socketID를 찾는다.
    RedisClient.get(data.userID, (err, value) => {
      if(err) console.log(err);
      // ID를 통해 해당 소켓에게 C 이벤트를 송신한다.
      io.to(value).emit('C', data.status);
      io.in('staff').emit('C');
      console.log(`소켓ID:${value}에게 소켓이벤트 C (주문상태 변동) 전송`);
    });
  });

  // 메뉴 상태 변경시 오는 이벤트
  socket.on('D', () => {
    // 자신 빼고 다른 관리자들과 전체 고객에게 반영되야 하기때문에 자신을 뺀 전체 소켓에게 전송
    socket.broadcast.emit('E');
    console.log('자신 빼고 전체 소켓에게 소켓이벤트 E 전송');
  });

  // 결제 성공하여 새로운 주문 발생시 오는 이벤트
  socket.on('F', () => {
    // 'staff' 룸에 있는 관리자 소켓에게 이벤트 G 전송
    io.in('staff').emit('G');
    console.log('근무자 소켓들에게 소켓이벤트 G 전송');
  });

  // 고객이 스스로 주문 취소시 이벤트 
  socket.on('H', () => {
    // 'staff' 룸에 있는 모든 소켓에게 이벤트 I 전송
    io.in('staff').emit('I');
    console.log('근무자 소켓들에게 소켓이벤트 I 전송');
  });

  // 주방에서 고객 주문 취소 시 이벤트 
  socket.on('J', (data) => {
    // 해당 고객 소켓에게 이벤트 K 전송
    // 레디스에서 userID를 통해 socketID를 찾는다.

    RedisClient.get(data.userID, (err, value) => {
      if(err) console.log(err);
      // ID를 통해 해당 소켓에게 C 이벤트를 송신한다.
      // 관리자 소켓중 나빼고 모두 전송
      socket.broadcast.in('staff').emit('K');
      io.to(value).emit('K');
      console.log('해당 주문 취소 고객에게 소켓이벤트 K 전송');
    });
  });

  // 영업 on/off 토글 변동시 오는 이벤트 
  socket.on('L', () => {
    // 'staff' 룸에 있는 모든 소켓에게 이벤트 I 전송
    io.in('ready').emit('M');

    console.log('초기화면에서 대기중인 고객 소켓들에게 소켓이벤트 I 전송');
  });
  
  // 소켓 연결 해제
  socket.on('disconnect', () => {
    // redis에 해당 소켓id가 key값으로 있을 경우 해당 key-value 전체 삭제.
    if(RedisClient.exists(socket.id)) {
      // console.log(`소켓 ${socket.id}이 해제되어 레디스에서 삭제합니다.`);
      // console.log(`레디스 값 ${socket.id}`);
      RedisClient.del(socket.id, RedisClient.print);
    }
  });
});

// DB 연동 후 서버 구동
syncDb().then((_) => {
  console.log('Sync database!');
  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`HTTPServer is running on ${PORT} port`);
  });
  RedisClient.flushall((err) => {
    if(err) console.log(err);
  });
});