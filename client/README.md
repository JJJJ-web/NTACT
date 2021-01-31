# NTACT

## Client

1. 파일 실행은 ./NTACT/client 에서 yarn start 또는 npm start를 해주세요.

2. 수정 내역

(21.01.29)
* 아직 convention 들여쓰기를 2로 할지 4로 할지 안 정해져서 일단은 제일 최근 버전인 2로 맞춰서 올렸습니다.
* Google Login Key가 80자가 넘어가는 바람에 .eslintrc.js에 <strong>max-len: 0</strong>을 추가했습니다.
* Facebook login을 지우고 Google login을 추가했습니다.

(21.01.30)
* 로그인 성공 시 Session Storage에 기록되도록 수정했습니다. (노션-백엔드-소통의 장-로그인 구현 프론트쪽 진행상황 페이지에 스크린샷 참고)
* 로그인 성공 시 Session Storage에 기록 / session 시간이 짧을 경우 local Storage 사용 가능
* 처음 실행시 Home 화면 > login 성공 시 menu 화면으로 이동 가능 합니다. 현재 localhost:3000/menu, /cart, /payment 이동 가능합니다.
* <code>axios.post(url, /.../)</code>을 통해서 백으로 데이터 전송가능 합니다. 현재 2개의 코드가 있으며 주석처리 안된 코드는 json 포멧 데이터 형식으로, 주석처리된 코드는 json 데이터가 아닌 버전입니다.
* url에는 백엔드쪽 서버 url을 적어야 한다고 합니다. 현재는 아무 url로 기입해놨습니다.
* 데이터가 넘어가는 지 확인하는 법은 노션-백엔드-소통의 장-로그인 구현 프론트쪽 진행상황 페이지에 스크린샷 참고

(21.02.01)
* 로그인 성공 시 /coffee 로 이동합니다.
* 아직 장바구니나 onClick 이벤트 처리하지 않았습니다.
* 메뉴 페이지 순서는 coffee > milk beverage > ade > shake > coffee 순 입니다.

3. 구글 로그인
   * Google Login을 사용하실 경우에는 학교 이메일로 로그인 부탁드립니다! (조직만 사용 가능하게 했더니 학교 이메일만 로그인이 됩니다!)
   * Google Login에서도 페북과 같이 아이디, 이메일, 이름 등만 수집 가능합니다.
