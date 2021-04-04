const UserModel = require('../../models').dev_user;
const axios = require('axios');
const jwt = require('jsonwebtoken');
// eslint-disable-next-line camelcase
const password_config = require('../../config/password-config.json');

exports.index = (ctx) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

// 카카오 로그인
exports.kakao = async (ctx) => {
    // header로 보낸 request payload를 접근하려면 body로 접근
    const kakaoToken = ctx.request.body.headers.Authorization;
    let jwtToken;

    // kakao 서버에 요청하여 유저정보 가져온후 DB에 저장
    await axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            'Authorization': `Bearer ${kakaoToken}`,
        },
    })
        .then((res) => {
            const kakaoUserDB = res.data;
            
            // 토큰 생성
            jwtToken = jwt.sign(
                {
                    username: kakaoUserDB.properties.nickname,
                    id: kakaoUserDB.id, // 유저 정보
                },
                password_config.jwt_password, // secrec Key
            );    
            
            /*
            DB에 해당 id를 가지고 있는것을 찾아본다.
            findOrCreate 메서드는 검색되었거나 또는 생성된 객체를 포함한 배열, 그리고 boolean값을 반환합니다. 여기서 boolean값은, 새 객체가 생성되었을 경우 true, 그렇지 않을 경우 false입니다.
            */
            UserModel.findOrCreate({
                where: {userid: `${kakaoUserDB.id}`},
                // 없을경우 defualts에 있는 정보로 user가 생성된다.
                defaults: {
                    username: `${kakaoUserDB.properties.nickname}`,
                    email: `${kakaoUserDB.kakao_account.email}`,
                    gender: `${kakaoUserDB.kakao_account.gender}`,
                    profile_image: `${kakaoUserDB.properties.profile_image}`,
                    age: `${kakaoUserDB.kakao_account.age_range}`,
                    sns: `Kakao`,
                },
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    
    ctx.body = {jwtToken: jwtToken};
    ctx.status = 200;
};

// 구글 로그인
exports.google = async (ctx) => {
    // header로 보낸 request payload를 접근하려면 body로 접근
    const GoogleToken = ctx.request.body.headers.Authorization;
    let jwtToken;

    // kakao 서버에 요청하여 유저정보 가져온후 DB에 저장
    await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
        headers: {
            'Authorization': `Bearer ${GoogleToken}`,
        },
    })
        .then((res) => {
            const GoogleUserDB = res.data;
            console.log(GoogleUserDB);
            // 토큰 생성
            jwtToken = jwt.sign(
                {
                    username: GoogleUserDB.name,
                    id: GoogleUserDB.sub, // 유저 정보
                },
                password_config.jwt_password, // secrec Key
            );    
            
            /*
            DB에 해당 id를 가지고 있는것을 찾아본다.
            findOrCreate 메서드는 검색되었거나 또는 생성된 객체를 포함한 배열, 그리고 boolean값을 반환합니다. 여기서 boolean값은, 새 객체가 생성되었을 경우 true, 그렇지 않을 경우 false입니다.
            */
            UserModel.findOrCreate({
                where: {userid: `${GoogleUserDB.sub}`, sns: 'Google'},
                // 없을경우 defualts에 있는 정보로 user가 생성된다.
                defaults: {
                    username: `${GoogleUserDB.name}`,
                    email: `${GoogleUserDB.email}`,
                    profile_image: `${GoogleUserDB.picture}`,
                    sns: `Google`,
                },
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    
    ctx.body = {jwtToken: jwtToken};
    ctx.status = 200;
};