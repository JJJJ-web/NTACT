const app = require('./index');
const syncDb = require('./sync-db');

// DB 연동 후 서버 구동
syncDb().then((_)=> {
    console.log('Sync database!');
    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} port`);
    });
});