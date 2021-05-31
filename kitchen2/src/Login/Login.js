import React from 'react';
import { useHistory } from 'react-router-dom';
import {
  Form, Input, Button, Checkbox, message,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import jwt from 'jsonwebtoken';
import styled from 'styled-components';
import loginInfo from './loginInfo.json';
import socket from '../SocketInfo';

function Login() {
  const history = useHistory();
  
  function login(values) {
    axios({
      url: '/api/users/staff',
      method: 'POST',
      data: {
        email: values.Id,
        password: values.Password,
      },
    })
      .then((res) => { // 로그인 성공시
        console.log(res);
        if (res.status === 200) {
          const user = jwt.verify(
            res.data.jwtToken,
            loginInfo.jwt_password,
          ); // 백에서 jwtToken받아옴
          sessionStorage.setItem(
            'userInfo',
            JSON.stringify({ userID: user.id, userName: user.name, userRole: user.role }),
          );
          socket.emit('A', { userID: user.id, socketID: socket.id, role: user.role });
          history.push('/kitchen');
        }
      })
      .catch((error) => {
        console.log(error.response);
        if (error.response.status === 801) {
          message.error('ID를 확인하세요.', 10);
        }else if(error.response.status === 802) {
          message.error('비밀번호를 확인하세요.', 10);
        }
      });
  }

  const onFinish = (values) => {
    login(values);
  };

  const layout = {
    labelCol: {
      span: 3,
    },
    wrapperCol: {
      span: 20,
    },
  };

  return (
    <Container>
      <Form
        name="normal_login"
        className="login-form"
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
          이디야커피 한성대점
          <b>
            {' '}
            ver. 관리자
          </b>
        </div>

        <Form.Item
          name="Id"
          rules={[
            {
              required: true,
              message: 'ID를 입력하세요',
            },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="ID" />
        </Form.Item>

        <Form.Item
          name="Password"
          rules={[
            {
              required: true,
              message: '비밀번호를 입력하세요',
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            LogIn
          </Button>
        </Form.Item>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  .ant-btn-primary {
    color: #fff;
    background: #ffb400;
    border-color: #ffb400;
    text-shadow: 0 -1px 0 rgb(0 0 0 / 12%);
    box-shadow: 0 2px 0 rgb(0 0 0 / 5%);
    width: 100%;
  }
`;

export default Login;