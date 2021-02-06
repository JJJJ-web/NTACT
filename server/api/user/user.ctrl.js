const kakaoUserModel = require('../../models').dev_user;
const axios = require('axios');

function getUserDB(kakaoToken) {
    axios.get('https://kapi.kakao.com/v2/user/me', {
        headers: {
            'Authorization': `Bearer ${kakaoToken}`,
        },
    })
        .then((response) => {
            const kakaoUserDB = response.data;
            // console.log(kakaoUserDB);

            // DB에 해당 id를 가지고 있는것을 찾아본다.
            kakaoUserModel.findOrCreate({where: {userid: `${kakaoUserDB.id}`},
            //없을경우 defualts에 있는 정보로 user가 생성된다.
            defaults: { username: `${kakaoUserDB.properties.nickname}`,
                        email: `${kakaoUserDB.kakao_account.email}`,
                        gender: `${kakaoUserDB.kakao_account.gender}`,
                        profile_image: `${kakaoUserDB.properties.profile_image}`,
                        age: `${kakaoUserDB.kakao_account.age_range}`,                
            }})
        /*
        "spread" 메서드는 배열을 user와 created 2개 부분으로 나누어 이어지는 콜백에 인자로 전달합니다. 따라서 "user"는 반환된 배열의 0번째 인덱스에 존재하는 객체이고, "created"는 true값을 갖는 boolean 변수입니다.
        */
            .spread((user, created) => {
                  console.log(user);
                  console.log(created)
              /*
               findOrCreate 메서드는 검색되었거나 또는 생성된 객체를 포함한 배열, 그리고 boolean값을 반환합니다. 여기서 boolean값은, 새 객체가 생성되었을 경우 true, 그렇지 않을 경우 false입니다.
          
              [ {
                  username: 'sdepold',
                  job: 'Technical Lead JavaScript',
                  id: 1,
                  createdAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET),
                  updatedAt: Fri Mar 22 2013 21: 28: 34 GMT + 0100(CET)
                },
                true ]
              */
            })
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            return;
        });
}

exports.index = (ctx) => {
    ctx.body = `${ctx.request.method} ${ctx.request.path}`;
};

exports.loginKakao = (ctx) => {
    // header로 보낸 request payload를 접근하려면 body로 접근
    const kakaoToken = ctx.request.body.headers.Authorization;
    console.log(`access token : ${kakaoToken}`);
    getUserDB(kakaoToken);
};

