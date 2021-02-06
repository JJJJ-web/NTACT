const kakaoUserModel = require('../../models').dev_user;
const axios = require('axios');
const jwt = require('jsonwebtoken');

exports.index = (ctx) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

exports.loginKakao = async (ctx) => {
    let jwtToken;
    let username;

    // header로 보낸 request payload를 접근하려면 body로 접근
    const kakaoToken = ctx.request.body.headers.Authorization;
    // console.log(`access token : ${kakaoToken}`);
    axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            'Authorization': `Bearer ${kakaoToken}`,
        },
    })
        .then((res) => {
            const kakaoUserDB = res.data;
            /*
            DB에 해당 id를 가지고 있는것을 찾아본다.
            findOrCreate 메서드는 검색되었거나 또는 생성된 객체를 포함한 배열, 그리고 boolean값을 반환합니다. 여기서 boolean값은, 새 객체가 생성되었을 경우 true, 그렇지 않을 경우 false입니다.
            */
            kakaoUserModel.findOrCreate({
                where: {userid: `${kakaoUserDB.id}`},
                // 없을경우 defualts에 있는 정보로 user가 생성된다.
                defaults: {
                    username: `${kakaoUserDB.properties.nickname}`,
                    email: `${kakaoUserDB.kakao_account.email}`,
                    gender: `${kakaoUserDB.kakao_account.gender}`,
                    profile_image: `${kakaoUserDB.properties.profile_image}`,
                    age: `${kakaoUserDB.kakao_account.age_range}`,
                },
            });

            console.log(`유저DB 저장 완료`);

            // jwt 토큰 생성
            jwtToken = jwt.sign({
                name: `${kakaoUserDB.properties.nickname}`,
            }, 'qlalfqjsgh');
            
            // 토큰으로 보내기 성공시 삭제
            username = `${kakaoUserDB.properties.nickname}`;
        })
        .catch(function (error) {
            console.log(error);
        });
        
    // 이름을 직접 보내는 방식
    ctx.response.body = {name: `${username}`};
    ctx.response.status = 200;
};

