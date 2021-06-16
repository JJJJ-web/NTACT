<p align="center">
  <img src="https://github.com/coding-Benny/NTACT/blob/dev/client/public/logo40.png" alt="NTACT logo"><br><br>
  <img src="https://img.shields.io/badge/npm-v7.16.0-blue" alt="npm v7.16.0">&nbsp;<img src="https://img.shields.io/github/license/coding-Benny/NTACT" alt="license GPL-3.0">&nbsp;<img src="https://img.shields.io/badge/node-v14.16.0-brightgreen" alt="node v14.16.0">
</p>

# NTACT

> 👩‍💼 비대면 시대에 적합한 매장 통합 관리 웹 애플리케이션 NTACT 👨‍💼

기존 매장의 키오스크 사용은 고객에게 있어 긴 대기 줄과 위생 문제를 비롯하여 불편한 점이 많습니다. 애플리케이션을 사용하더라도 브랜드마다 자사 앱을 설치해야 하는 번거로움이 있습니다. 직원 입장에서는 종이 주문서와
구두 소통은 착오를 일으키는 등의 어려운 점이 존재합니다. NTACT는 이러한 문제점을 해결하기 위해 웹 브라우저를 통한 간단한 주문 및 결제와 디지털화 된 주방 제어 서비스를 제공합니다👩‍🍳

<details open>
  <summary><h2>📋 Table of Contents</h2></summary>
  <ul>
    <li><a href="#getting-started">Getting started</a></li>
    <ul>
      <li><a href="#prerequisites">Prerequisites</a></li>
      <li><a href="#installation-and-run">Installation & Run</a></li>
      <li><a href="#initial-configuration">Initial configuration</a></li>
    </ul>
    <li><a href="#project-architecture">Project architecture</a></li>
    <li><a href="#flow-chart">Flow chart</a></li>
    <li><a href="#features">Features</a></li>
    <ul>
        <li><a href="#client">Client</a></li>
        <li><a href="#manager">Manager</a></li>
    </ul>
    <li><a href="#maintainers">Maintainers</a></li>
    <li><a href="#links">Links</a></li>
    <li><a href="#license">License</a></li>
  </ul> 
</details>


<h2 id="getting-started">🚀 Getting started</h2>

<h3 id="prerequisites">Prerequisites</h3>

- npm

  ```
  npm install npm@latest -g
  ```

<h3 id="installation-and-run">Installation & Run</h3>

1. Clone the repository

   ```
   git clone https://github.com/coding-Benny/NTACT.git
   ```

2. Install NPM packages and run

    - 📱 client

      ```
      cd client
      npm install
      npm run start
      ```

    - 👔 manager

      ```
      cd manager
      npm install
      npm run start
      ```

    - 💻 server

      ```
      cd server
      npm install
      npm run start
      ```

<details open>
  <summary><h3 id="initial-configuration">Initial Configuration</h3></summary>
  <ul>
    <li>Client configuration: <code>client/src/config</code></li>
    <ul>
      <li>loginInfo.json</li>

    {
      "jwt_password": "Put your JWT password"
    }

  <li>payment.json</li>

    {
      "imp_user_code": "Put your I'mport; franchisee identification code"
    }

</ul>

<li>Manager configuration: <code>manager/src/Login</code></li>

- loginInfo.json

  ```
  {
    "jwt_password": "Put your JWT password"
  }
  ```

<li>Server configuration: <code>server/src/config</code></li>

- db-config.json

  ```
  {
    "development": {    
      "username": "Put your user name here",
      "password": "Put your password here",
      "database": "Put your database here",
      "host": "Put your host name here",
      "dialect": "mysql",
      "operatorsAliases": 0,
      "define": {
        "timestamps": false,
        "underscored" : true
      }  
    },  
    "test": {
      "username": "Put your username here",
      "password": "Put your password here",
      "database": "Put your database here",
      "host": "Put your host name here",
      "dialect": "mysql"
    },  
    "production": {
      "username": "Put your username here",
      "password": "Put your password here",
      "database": "Put your database here",
      "host": "Put your host name here",
      "dialect": "mysql"
    }
  }
  ```

- password-config.json

  ```
  {
    "jwt_password" : "Put your JWT password"
  }
  ```

- payment-config.json

  ```
  {
    "imp_key": "Put your REST API key",
    "imp_secret": "Put your REST API Secret key"
  }
  ```

- s3-config.json

  ```
  {  
    "AWSAccessKeyId": "Put your AWS access key ID",
    "AWSSecretKey": "Put your AWS Secret key",
    "Bucket": "Put your bucket name"
  }
  ```

- Syncing database

    1. Create `server/sync-db.bat` file

       ```
       start cmd /c "npx sequelize-auto -h YOUR_HOST_NAME -d YOUR_DATABASE_NAME -u YOUR_USERNAME -x YOUR_PASSWORD -p YOUR_PORT_NUMBER -c YOUR_CONFIG_FILE_PATH -o YOUR_OUTPUT_DIRECTORY -C"
       @ECHO DB Sync Done!
       ```

    2. Run batch file

       ````
       cd serversync-db.bat# if you're a Mac user...cd serverchmod u+x ./sync-db.bat./sync-db.bat
       ````
    </ul>

</details>


<h2 id="project-architecture">🏗️ Project Architecture</h2>

<img src="https://github.com/coding-Benny/NTACT/blob/dev/images/NTACT-architecture.png" alt="Project Architecture" width="750">

<h2 id="flow-chart">🔍 Flow Chart</h2>

<img src="https://github.com/coding-Benny/NTACT/blob/dev/images/NTACT-flowchart.png" alt="Flow Chart" width="600">

<h2 id="features">🎈 Features</h2>

<h3 id="client">Client</h3>
<ul>
    <li>로그인</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/login.png" alt="client-login" width="250">
    <li>메뉴 페이지</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/menu.png" alt="menu" width="250">
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/add-menu.png" alt="add menu" width="250">
    <li>장바구니</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/my-cart.png" alt="my cart" width="250">
    <li>결제</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/input-customer-info.png" alt="input customer's info" width="250">
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/payment.png" alt="payment" width="250">
    <li>주문 처리 현황</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/order-accepted.png" alt="order accepted" width="250">
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/order-in-progress.png" alt="order in-progress" width="250">
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/order-completed.png" alt="order completed" width="250">
    <li>주문 취소</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/cancel-order.png" alt="cancel order" width="250">
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/order-canceled.png" alt="order canceled" width="250">
    <li>주문 내역</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/client/order-history.png" alt="order history" width="250">
</ul>

<h3 id="manager">Manager</h3>
<ul>
    <li>로그인</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/manager/login.jpg" alt="manager login" width="700">
    <li>주문 접수 내역</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/manager/order-list.jpg" alt="order list" width="700">
    <li>실시간 메뉴 상태 관리</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/manager/realtime-menu-management.jpg" alt="realtime menu management" width="550">
    <li>카테고리 & 메뉴 생성</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/manager/create-category-and-menu.jpg" alt="create category and menu" width="550">
    <li>카테고리 관리</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/manager/category-management.jpg" alt="category management" width="700">
    <li>메뉴 관리</li>
        <img src="https://github.com/coding-Benny/NTACT/blob/dev/images/manager/menu-management.jpg" alt="menu management" width="700">
</ul>

<h2 id="maintainers">👩‍💻 Maintainers 👨‍💻</h2>

<table>
    <tr>
        <td align="center">
            <a href="https://github.com/truebliss">
                <img src="https://avatars.githubusercontent.com/u/68186349?v=4" width="75px;" alt="YeonJi Kim"/><br />
                <sub><b>김연지</b></sub>
            </a>
        </td>
        <td>
            <a href="https://github.com/coding-Benny/NTACT/commits/dev?author=truebliss" title="Code">📜 Commit Log</a>
        </td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://github.com/jokbalkiller">
                <img src="https://avatars.githubusercontent.com/u/55704603?v=4" width="75px;" alt="JongGeun Park"/><br />
                <sub><b>박종근</b></sub>
            </a>
        </td>
        <td>
            <a href="https://github.com/coding-Benny/NTACT/commits/dev?author=jokbalkiller" title="Code">📜 Commit Log</a>
        </td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://github.com/Coding-Benny">
                <img src="https://avatars.githubusercontent.com/u/51183274?v=4" width="75px;" alt="JeongHyeon Lee"/><br />
                <sub><b>이정현</b></sub>
            </a>
        </td>
        <td align="center">
          <a href="https://github.com/coding-Benny/NTACT/wiki/%5BMaintainer%5D-%EC%9D%B4%EC%A0%95%ED%98%84" title="What Did I Do">📌 Role</a><br>
          <a href="https://github.com/coding-Benny/NTACT/commits/dev?author=coding-Benny" title="Code">📜 Commit Log</a>
        </td>
    </tr>
    <tr>
        <td align="center">
            <a href="https://github.com/reader-wh94">
                <img src="https://avatars.githubusercontent.com/u/68210266?v=4" width="75px;" alt="SuJin Choi"/><br />
                <sub><b>최수진</b></sub>
            </a>
        </td>
        <td>
         <a href="https://github.com/coding-Benny/NTACT/commits/dev?author=reader-wh94" title="Code">📜 Commit Log</a>       
        </td>
    </tr>
</table>

<h2 id="links">🔗 Links</h2>

<ul>
  <li>Repository: https://github.com/coding-Benny/NTACT</li>
  <li>NTACT client's homepage: https://ntact.site</li>
  <li>NTACT manager's homepage: https://manager.ntact.site</li>
  <li>Video</li>
    <a href="https://www.youtube.com/watch?v=Jv8nx1BdveI&feature=youtu.be" target="_blank"><img src="http://img.youtube.com/vi/Jv8nx1BdveI/0.jpg" alt="NTACT's youtube thumbnail"></a>
</ul>


<h2 id="license">📝 License</h2>

The code in this project is licensed under [GPL-3.0](https://github.com/coding-Benny/NTACT/blob/dev/LICENSE) license.
See `LICENSE` for more information.