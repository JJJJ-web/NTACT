import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Button, Select, Radio, Divider} from 'antd';
import {withRouter, useHistory} from 'react-router-dom';
import queryString from 'query-string';
import impCode from '../config/payment.json';
import PaySuccess from './PaySuccess';
import axios from 'axios';
import styled from 'styled-components';
import {CreditCardOutlined} from '@ant-design/icons';
import axois from 'axios';

function Payment({sumAmount, cartItems}) {
    const history = useHistory();
    let [phoneNumber, setPhoneNumber] = useState('');
    let [email, setEmail] = useState('');
    let [orderType, setOrderType] = useState('');
    const data = {
        pg: 'html5_inicis', // PG사
        pay_method: 'card', // 결제수단
        name: '주문명', // 상품 이름
        merchant_uid: '주문번호', // 주문번호
        amount: sumAmount, // 결제금액
        buyer_name: JSON.parse(sessionStorage.getItem('userInfo')).userName, // 구매자 이름
        buyer_tel: phoneNumber, // 구매자 전화번호
        buyer_email: email, // 구매자 이메일
    };
    async function sendCartData(sumAmount, cartItems) {
        await axios.post('/api/payments/order',
            {
                cart: cartItems,
                sum: sumAmount,
                order_type: orderType, // 취식
            }).then((res) => {
            if (res.status === 200) {
                window.alert('전송 성공111');
                data.name = res.data.order_name;
                data.merchant_uid = res.data.order_id;
            } else {
                window.alert('전송 실패111');
            }
        });
    }

    async function handleSubmit() {
        const userCode = impCode.imp_user_code;
        await sendCartData(sumAmount, cartItems); // cart, 가격 전달

        /* 웹 환경일때 */
        const {IMP} = window;
        IMP.init(userCode);
        await IMP.request_pay(data, callback);
    }

    function callback(response) {
        const query = queryString.stringify(response);
        if (response.success) { // 결제 성공 시
            axios({
                url: '/api/payments/iamport-webhook', // 가맹점 서버에 전달할 파라미터에 필요한 서버 URL
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': response.access_token,
                },
                data: {
                    imp_uid: response.imp_uid,
                    merchant_uid: response.merchant_uid,
                },
            }).then((data) => { // 가맹점 서버 결제 API 성공시 로직
                if(data.data.status=='success') {
                    data.data.order_type = orderType;
                    console.log(data.data);
                    history.push({
                        pathname: '/payment_success',
                        state: {orderData: data.data},
                    });
                } else {
                    history.push({
                        pathname: '/payment/result',
                        state: {result: response},
                    });
                }
            }).catch((err) => { // 에러 처리
                history.push({
                    pathname: '/payment/result',
                    state: {result: response},
                });
            });
        } else { // 결제 실패 시
            history.push({
                pathname: '/payment/result',
                state: {result: response},
            });
        }
    }

    function onInputPhonenumber(e) {
        let value = e.target.value;
        value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPhoneNumber(phoneNumber = value);
    }

    function onInputEmail(e) {
        setEmail(email = e.target.value);
    }

    function onChangeRadio(e) {
        setOrderType(orderType = e.target.value);
    }

    return (
        <FormStyles>
            <Form onFinish={handleSubmit} name="paymentForm">
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
                    <span className='inputForm'>{data.buyer_name}</span>
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
                    <span className='inputForm'><Input onChange={onInputPhonenumber}
                        placeholder="번호를 입력하세요."
                        maxLength={11}
                        value={phoneNumber}/></span>
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
                    <span className='inputForm'><Input onChange={onInputEmail} placeholder="이메일을 입력하세요."/></span>
                </Form.Item>

                <Divider />

                <Button type="primary" htmlType="submit" shape="round" size="large" icon={<CreditCardOutlined />}>
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
