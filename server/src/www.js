const app = require('./index');
const syncDb = require('./sync-db');
const port = 4000;

// DB연동 후 서버 연동
syncDb().then(_=> {
  console.log('Sync database!');
  app.listen(port, () => {
    console.log(`Server is running on ${port} port`);
  });
})