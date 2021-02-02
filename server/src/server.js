const app = require('./index');
const syncDb = require('./sync-db');

// DB 연동 후 서버 구동
syncDb().then((_)=> {
    console.log('Sync database!');
    app.listen(4000, () => {
        console.log(`Server is running on 4000 port`);
    });
});