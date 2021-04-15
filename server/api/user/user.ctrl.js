const axios = require('axios');
const jwt = require('jsonwebtoken');
const userModel = require('../../models').dev_user;
const chefModel = require('../../models').dev_chef;
const adminModel = require('../../models').dev_admin;
const passwordConfig = require('../../config/password-config.json');


// 카카오 로그인
exports.kakao = async (ctx) => {
  // header로 보낸 request payload를 접근하려면 body로 접근
  const kakaoToken = ctx.request.body.headers.Authorization;
  let jwtToken;

  // kakao 서버에 요청하여 유저정보 가져온후 DB에 저장
  await axios.get('https://kapi.kakao.com/v2/user/me', {
    headers: {
      Authorization: `Bearer ${kakaoToken}`,
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
        passwordConfig.jwt_password, // secret Key
      );    
            
      /*
        DB에 해당 id를 가지고 있는것을 찾아본다.
        findOrCreate 메서드는 검색되었거나 또는 생성된 객체를 포함한 배열, 그리고 boolean 값을 반환합니다.
        여기서 boolean 값은, 새 객체가 생성되었을 경우 true, 그렇지 않을 경우 false 입니다.
      */
      userModel.findOrCreate({
        where: { userid: `${kakaoUserDB.id}` },
        // 없을경우 defaults에 있는 정보로 user가 생성된다.
        defaults: {
          username: `${kakaoUserDB.properties.nickname}`,
          email: `${kakaoUserDB.kakao_account.email}`,
          gender: `${kakaoUserDB.kakao_account.gender}`,
          profile_image: `${kakaoUserDB.properties.profile_image}`,
          age: `${kakaoUserDB.kakao_account.age_range}`,
          sns: 'Kakao',
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
    
  ctx.body = { jwtToken };
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
      Authorization: `Bearer ${GoogleToken}`,
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
        passwordConfig.jwt_password, // secret Key
      );    
            
      /*
        DB에 해당 id를 가지고 있는것을 찾아본다.
        findOrCreate 메서드는 검색되었거나 또는 생성된 객체를 포함한 배열, 그리고 boolean 값을 반환합니다.
        여기서 boolean 값은, 새 객체가 생성되었을 경우 true, 그렇지 않을 경우 false 입니다.
      */
      userModel.findOrCreate({
        where: { userid: `${GoogleUserDB.sub}`, sns: 'Google' },
        // 없을경우 defaults에 있는 정보로 user가 생성된다.
        defaults: {
          username: `${GoogleUserDB.name}`,
          email: `${GoogleUserDB.email}`,
          profile_image: `${GoogleUserDB.picture}`,
          sns: 'Google',
        },
      });
    })
    .catch((error) => {
      console.log(error);
    });
    
  ctx.body = { jwtToken };
  ctx.status = 200;
};

// 주방관리자 로그인
exports.chef = async (ctx) => {
  // header로 보낸 request payload를 접근하려면 body로 접근
  // 로그인시 이메일과 비밀번호 jwt로 프론트에서 보내줌
  let JWT = ctx.request.body.headers.Authorization;
        
  jwt.verify(JWT, passwordConfig.jwt_password)
    .then((data) => {
      // chef DB에서 Email과 Password 확인
      chefModel.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
      }).then((result) => {
        // 로그인 성공 시
        // chef 권한,이름을 담은 토큰 생성 후 200전송

        console.log(`${result} Chef DB를 찾았습니다. 로그인 성공`);
        JWT = jwt.sign(
          {
            name: result.name,
            role: 'chef',
          },
          passwordConfig.jwt_password, // secret Key
        );    
    
        ctx.body = { JWT };
        ctx.status = 200;
      }).catch((err) => {
        console.log(err);
        // 로그인 실패시 403 반환
        ctx.status = 403;
      });
    });
};

// 관리자 로그인
exports.admin = async (ctx) => {
  // header로 보낸 request payload를 접근하려면 body로 접근
  // 로그인시 이메일과 비밀번호 jwt로 프론트에서 보내줌
  let JWT = ctx.request.body.headers.Authorization;
        
  jwt.verify(JWT, passwordConfig.jwt_password)
    .then((data) => {
      // chef DB에서 Email과 Password 확인
      adminModel.findOne({
        where: {
          email: data.email,
          password: data.password,
        },
      }).then((result) => {
        // 로그인 성공 시
        // chef 권한,이름을 담은 토큰 생성 후 200전송

        console.log(`${result} Admin DB를 찾았습니다. 로그인 성공`);
        JWT = jwt.sign(
          {
            name: result.name,
            role: 'admin',
          },
          passwordConfig.jwt_password, // secret Key
        );    
    
        ctx.body = { JWT };
        ctx.status = 200;
      }).catch((err) => {
        console.log(err);
        // 로그인 실패시 403 반환
        ctx.status = 403;
      });
    });
};

