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
    },
};

async function sendCartData(sumAmount, cartItems) {
    await axios.post('http://localhost:4000/api/payments/order',
        {
            cart: cartItems,
            sum: sumAmount,
        }).then((res) => {
        if (res.status === 200) {
            window.alert('전송 성공111');
        } else {
            window.alert('전송 실패111');
        }
    });
}

async function sendOrderData(data) {
    await axios.post('http://localhost:4000/api/payments/order',
        {
            name: data.name,
            amount: data.amount,
            buyer_name: data.buyer_name,
            buyer_tel: data.buyer_tel,
            buyer_email: data.buyer_email,
        }).then((res) => {
        if (res.status === 200) {
            window.alert('전송 성공222');
        }
    }).then((data) => { // 응답 처리
        window.alert(data.id);
        return data.id;
    });
}

function Payment({history, sumAmount, cartItems}) {
    let [phoneNumber, setPhoneNumber] = useState('');
    let [email, setEmail] = useState('');
    const date = new Date().toISOString().substr(0, 10).split('-').join('').toString();

    const data = {
        pg: 'html5_inicis', // PG사
        pay_method: 'card', // 결제수단
        name: '{itemName}', // 상품 이름
        merchant_uid: `${date}_${new Date().getTime()}`, // 주문번호
        amount: sumAmount, // 결제금액
        buyer_name: JSON.parse(localStorage.getItem('userInfo')).userName, // 구매자 이름
        buyer_tel: phoneNumber, // 구매자 전화번호
        buyer_email: email, // 구매자 이메일
    };

    async function handleSubmit() {
        const userCode = impCode.imp_user_code;
        await sendCartData(sumAmount, cartItems); // cart, 가격 전달
        const merchant = await sendOrderData(data); // 주문정보 전달
        data.merchant_uid = merchant;

        /* 웹 환경일때 */
        const {IMP} = window;
        IMP.init(userCode);
        await IMP.request_pay(data, callback);
    }

    function callback(response) {
        console.log(data);
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

    function onInputPhonenumber(e) {
        let value = e.target.value;
        value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setPhoneNumber(phoneNumber = value);
        console.log(phoneNumber);
    }

    function onInputEmail(e) {
        setEmail(email = e.target.value);
    }

    return (
        <Form onFinish={handleSubmit} name="paymentForm">
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
            <Form.Item {...tailLayout}>
                <Button type="primary" htmlType="submit">
                    결제하기
                </Button>
            </Form.Item>
        </Form>
    );
}

export default withRouter(Payment);
