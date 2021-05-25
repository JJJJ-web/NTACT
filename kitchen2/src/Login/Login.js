import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Input, Button, Checkbox, message,
} from 'antd';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import loginInfo from './loginInfo.json';

function Login() {
  const history = useHistory();
  
  function login(values) {
    axios({
      url: '/api/users/staff',
      method: 'POST',
      data: {
        email: values.ID,
        password: values.PW,
      },
    })
      .then((res) => { // 로그인 성공시
        if (res.status === 200) {
          const user = jwt.verify(
            res.data.jwtToken,
            loginInfo.jwt_password,
          ); // 백에서 jwtToken받아옴
          sessionStorage.setItem(
            'userInfo',
            JSON.stringify({ userID: user.id, userName: user.name, userRole: user.role }),
          );
          history.push('/kitchen');
        }
      })
      .catch((error) => {
        message.error('ID나 PW를 확인하세요.', 10);
      });
  }

  const onFinish = (values) => {
    login(values);
  };

  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      style={{
        width: '300px', height: '400px', position: 'absolute', margin: 'auto', left: 0, right: 0, top: 0, bottom: 0,
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '50px' }}>
        <img src="/logo40.png" alt="logo" style={{ marginBottom: '0.8rem' }} />
        <br />
        (이디야커피 한성대점)
        <b>
          {' '}
          매장 관리
        </b>
      </div>

      <Form.Item
        label="ID"
        name="ID"
        rules={[
          {
            required: true,
            message: 'ID를 입력하세요',
          },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="PW"
        name="PW"
        rules={[
          {
            required: true,
            message: '비밀번호를 입력하세요',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          LogIn
        </Button>
      </Form.Item>
    </Form>
  );
}
export default Login;