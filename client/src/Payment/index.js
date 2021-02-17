import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Form, Input, Button, Select} from 'antd';
import {withRouter} from 'react-router-dom';
import queryString from 'query-string';
import impCode from '../config/payment.json';
import axios from 'axios';
import styled from 'styled-components';

const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};

function Payment({history}) {
    const data = {
        pg: 'html5_inicis', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `ntact_${new Date().getTime()}`, // 주문번호
        amount: 1000, // 결제금액
        buyer_name: JSON.parse(localStorage.getItem('userInfo')).userName, // 구매자 이름
        buyer_tel: '01012341234', // 구매자 전화번호
        buyer_email: 'example@example', // 구매자 이메일
    };

    function handleSubmit() {
        const userCode = impCode.imp_user_code;
        console.log(userCode);

        /* 웹 환경일때 */
        const {IMP} = window;
        IMP.init(userCode);
        IMP.request_pay(data, callback);
    }

    function callback(response) {
        console.log(data.buyer_name);
        const query = queryString.stringify(response);
        if (response.success) { // 결제 성공 시
            axios({
                url: 'http://localhost:4000/api/payments/complete', // 가맹점 서버에 전달할 파라미터에 필요한 서버 URL
                method: 'post',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': response.access_token,
                },
                data: {
                    imp_uid: response.imp_uid,
                    merchant_uid: response.merchant_uid,
                    amount: response.amount,
                    buyer_name: response.buyer_name,
                    buyer_tel: response.buyer_tel,
                    buyer_email: response.buyer_email,
                },
            }).then((data) => { // 가맹점 서버 결제 API 성공시 로직
                history.push(`/payment/result?${query}`);
            }).then((data) => { // 응답 처리
                switch (data.status) {
                case 'success':
                    // 결제 성공 시 로직
                    break;
                }
            });
        } else {
            console.log(response);
            history.push(`/payment/result?${query}`);
            alert('결제에 실패하였습니다.', response.error_msg);
        }
    }

    return (
        <Container>
            <Form onFinish={handleSubmit} name="dynamic_rule">
                <Form.Item label="결제금액">
                    <inputText>{data.amount}</inputText>
                </Form.Item>
                <Form.Item label="구매자 이름">
                    <inputText>{data.buyer_name}</inputText>
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
                    <inputText><Input placeholder="번호를 입력하세요." maxLength={11} /></inputText>
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
                    <inputText><Input placeholder="이메일을 입력하세요." /></inputText>
                </Form.Item>
                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        결제하기
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  position: absolute;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 2rem;
  
  inputText{
    padding-left: 2rem;
  }
`;

export default withRouter(Payment);
