import React, { useState } from 'react';
import 'antd/dist/antd.css';
import {
  Form, Input, Button, Radio, Divider, Alert, notification,
} from 'antd';
import { withRouter, useHistory } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import { CreditCardOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import impCode from '../config/payment.json';
import { deleteAll } from '../store/actions';

function Payment({ sumAmount, cartItems }) {
  const history = useHistory();
  const { userID } = JSON.parse(sessionStorage.getItem('userInfo'));
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [orderType, setOrderType] = useState('');
  const dispatch = useDispatch();
  const saleData = [];
  let sale = [];

  const data = {
    pg: 'html5_inicis', // PG사
    pay_method: 'card', // 결제수단
    name: '주문명', // 상품 이름
    merchant_uid: '주문번호', // 주문번호
    amount: sumAmount, // 결제금액
    buyer_name: JSON.parse(sessionStorage.getItem('userInfo')).userName, // 구매자 이름
    buyer_tel: phoneNumber, // 구매자 전화번호
    buyer_email: email, // 구매자 이메일
    // m_redirect_url: 'https://dev.ntact.site/api/payments/complete/mobile',
    m_redirect_url: 'http://localhost:4000/api/payments/complete/mobile',
  };
  async function sendCartData(sumAmount, cartItems) {
    let sendStat;
    await axios
      .post('/api/payments/order', {
        cart: cartItems,
        sum: sumAmount,
        order_type: orderType, // 취식
        buyer_id: userID,
      })
      .then((res) => {
        if (res.status === 200) {
          sendStat = 200;
          data.name = res.data.order_name;
          data.merchant_uid = res.data.order_id;
        }
      }).catch((err) => {
        if(err.response.status === 409) {
          sendStat = 409;
          sale = err.response.data;
        }
      });
    return sendStat;
  }

  function getOrderData() {
    axios
      .post(`/api/payments/${userID}/${data.merchant_uid}`)
      .then((res) => {
        history.push({
          // pathname: '/payment_success',
          pathname: '/payment/result',
          state: { orderInfo: res.data },
        });
      })
      .catch((error) => false);
  }

  function callback(response) { // pc버전 결제
    if (response.success) {
      // 결제 성공 시
      axios({
        url: '/api/payments/iamport-webhook', // 가맹점 서버에 전달할 파라미터에 필요한 서버 URL
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization: response.access_token,
        },
        data: {
          imp_uid: response.imp_uid,
          merchant_uid: response.merchant_uid,
        },
      })
        .then((data) => {
          // 가맹점 서버 결제 API 성공시 로직
          if (data.data.status === 'success') {
            data.data.order_type = orderType;
            dispatch(deleteAll());
            history.push({
              pathname: '/payment/result',
              state: { result: response },
            });
          } else {
            dispatch(deleteAll());
            history.push({
              pathname: '/payment/result',
              state: { result: response },
            });
          }
        })
        .catch((err) => {
          // 에러 처리
          history.push({
            pathname: '/payment/result',
            state: { result: response },
          });
        });
    } else {
      console.log(response);
      // 결제 실패 시
      history.push({
        pathname: '/payment/result',
        state: { result: response },
      });
    }
  }

  async function handleSubmit() {
    const userCode = impCode.imp_user_code;
    if(await sendCartData(sumAmount, cartItems) === 200) { // cart, 가격 전달
      const { IMP } = window;
      IMP.init(userCode);
      await IMP.request_pay(data, callback);
    } else {
      // 품절 처리
      for(let i = 0; i < cartItems.length; i++) {
        for(let j = 0; j < sale.length; j++) {
          if(cartItems[i].Id === sale[j]) {
            saleData.push(cartItems[i].Name);
          }
        }
      }
      notification.info({
        message: '품절된 메뉴가 있습니다.',
        description: `❗${saleData}❗ 품절입니다.`,
        duration: 0,
      });
      saleData.length = 0;
    }
  }

  function onInputPhonenumber(e) {
    let { value } = e.target;
    value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
    setPhoneNumber((value));
  }

  function onInputEmail(e) {
    setEmail((e.target.value));
  }

  function onChangeRadio(e) {
    setOrderType((e.target.value));
  }

  return (
    <FormStyles>
      <Form onFinish={handleSubmit} name="paymentForm">
        <br />
        <Alert
          message="주문이 승인되면 결제 취소가 불가합니다."
          type="info"
          showIcon
        />
        <br />
        <Form.Item
          name="식사"
          label="식사"
          rules={[
            {
              required: true,
              message: '취식 방법을 선택하세요.',
            },
          ]}
        >
          <Radio.Group onChange={onChangeRadio}>
            <Radio.Button value="pick-up">포장</Radio.Button>
            <Radio.Button value="dine-in">테이블 식사</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="구매자 이름">
          <span className="inputForm">{data.buyer_name}</span>
        </Form.Item>
        <Form.Item
          name="번호"
          label="번호"
          rules={[
            {
              required: true,
              message: '핸드폰 번호는 필수입력입니다.',
            },
          ]}
        >
          <span className="inputForm">
            <Input
              onChange={onInputPhonenumber}
              placeholder="번호를 입력하세요."
              maxLength={11}
              value={phoneNumber}
            />
          </span>
        </Form.Item>
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: '이메일 형식(example@example.com)으로 입력하세요.',
              required: false,
            },
          ]}
        >
          <span className="inputForm">
            <Input onChange={onInputEmail} placeholder="이메일을 입력하세요." />
          </span>
        </Form.Item>

        <Divider />

        <Button
          type="primary"
          htmlType="submit"
          shape="round"
          size="large"
          icon={<CreditCardOutlined />}
          disabled={sumAmount > 0 ? 0 : 1}
        >
          결제하기
        </Button>
      </Form>
    </FormStyles>
  );
}

const FormStyles = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: initial;
  text-align: center;
  margin-top: 50px;

  #paymentForm {
    margin-bottom: 20vh;
  }
  .ant-btn-primary {
    background-color: #ffb400;
    width: 50vw;
    padding-bottom: 10px;
    border: none;
    &:hover {
      background-color: white;
      color: #ffb400;
    }
  }
`;
export default withRouter(Payment);