const uuid4 = require('uuid4');
const axios = require('axios');
const jwt = require('jsonwebtoken');

const userModel = require('../../models').dev_user;
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
          exp: Math.floor(Date.now() / 1000) + (10 * 60),
          role: 'client',
          username: kakaoUserDB.properties.nickname,
          id: kakaoUserDB.id, // 유저 정보
          tel: kakaoUserDB.tel,
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
    .catch((e) => {
      ctx.throw(500, e);
    });

  ctx.body = { jwtToken };
  ctx.status = 200;
};

// 구글 로그인
exports.google = async (ctx) => {
  // header로 보낸 request payload를 접근하려면 body로 접근
  const GoogleToken = ctx.request.body.headers.Authorization;
  let jwtToken;

  // google 서버에 요청하여 유저정보 가져온후 DB에 저장
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
          exp: Math.floor(Date.now() / 1000) + (10 * 60),
          role: 'client',
          username: GoogleUserDB.name,
          id: GoogleUserDB.sub, // 유저 정보
          tel: GoogleUserDB.tel,
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
    .catch((e) => {
      ctx.throw(500, e);
    });

  ctx.body = { jwtToken };
  ctx.status = 200;
};

// 비회원 로그인
exports.anonymous = async (ctx) => {
  const splitUUID4 = uuid4().split('-');
  
  const jwtToken = jwt.sign(
    {
      exp: Math.floor(Date.now() / 1000) + (10 * 60),
      role: 'client',
      username: '비회원',
      id: splitUUID4[2] + splitUUID4[1] + splitUUID4[0] + splitUUID4[3] + splitUUID4[4], // 유저 정보
    },
    passwordConfig.jwt_password, // secret Key
  );

  ctx.body = { jwtToken };
  ctx.status = 200;
};

// 근무자 통합 로그인
exports.staff = async (ctx) => {
  // header로 보낸 request payload를 접근하려면 body로 접근
  // 로그인시 이메일과 비밀번호 헤더로 받음.
  const { email, password } = ctx.request.body;

  const checkEmail = await adminModel.findOne({
    where: {
      email,
    },
  }).catch((e) => {
    ctx.throw(500, e);
  });

  if (checkEmail === null) {
    ctx.status = 801;
    return;
  }
  // 로그인 성공 시
  // chef 권한,이름을 담은 토큰 생성 후 200전송

  const checkPW = await adminModel.findOne({
    where: {
      email,
      password,
    },
  }).catch((e) => {
    ctx.throw(500, e);
  });

  if (checkPW === null) {
    ctx.status = 802;
    return;
  }

  const result = checkPW;

  // console.log('관리자 DB를 찾았습니다. 로그인 성공');
  // console.log(`이름 : ${result.name} ID : ${result.id} role : ${result.role}`);

  const jwtToken = jwt.sign(
    {
      id: result.id,
      name: result.name,
      role: result.role,
    },
    passwordConfig.jwt_password, // secret Key
  );
  ctx.body = { jwtToken };
};
