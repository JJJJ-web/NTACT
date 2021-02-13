import React, {useState} from 'react';
import styled from 'styled-components';
import {Form, Select, Icon, Input, Switch, Button} from 'antd';
import {withRouter} from 'react-router-dom';
import {withUserAgent} from 'react-useragent';
import queryString from 'query-string';
import impCode from '../config/payment.json';

const {Item} = Form;

function Payment({history, form}) {
    const {
        getFieldDecorator,
        validateFieldsAndScroll,
    } = form;
    const data = {
        pg: 'html5_inicis', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `ntact_${new Date().getTime()}`, // 주문번호
        amount: 1000, // 결제금액
        buyer_name: '홍길동', // 구매자 이름
        buyer_tel: '01012341234', // 구매자 전화번호
        buyer_email: 'example@example', // 구매자 이메일
        buyer_addr: '신사동 661-16', // 구매자 주소
        buyer_postcode: '06018', // 구매자 우편번호
    };

    function handleSubmit(e) {
        e.preventDefault();

        validateFieldsAndScroll((error, values) => {
            if (!error) {
                /* 가맹점 식별코드 */
                const userCode = impCode.imp_user_code;
                console.log(userCode);
                /* 웹 환경일때 */
                const {IMP} = window;
                IMP.init(userCode);
                IMP.request_pay(data, callback);
            }
        });
    }

    function callback(response) {
        console.log(data.merchant_uid);
        const query = queryString.stringify(response);
        if (response.success) { // 결제 성공 시
            axios({
                url: 'https://localhost:4000/payments/complete', // 가맹점 서버에 전달할 파라미터에 필요한 서버 URL
                method: 'post',
                headers: {'Content-Type': 'application/json'},
                data: {
                    imp_uid: response.imp_uid,
                    merchant_uid: response.merchant_uid,
                    amount: response.amount,
                    buyerName: response.buyerName,
                },
            }).then((data) => { // 가맹점 서버 결제 API 성공시 로직
                history.push(`/payment/result?${query}`);
            }).then((data) => { // 응답 처리
                switch(data.status) {
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
        <Wrapper>
            <Header>아임포트 결제 테스트</Header>
            <FormContainer onSubmit={handleSubmit}>
                <Item label="PG사">
                    {data.pg}
                </Item>
                <Item label="결제수단">
                    {data.pay_method}
                </Item>
                <Item label="결제금액">
                    {data.amount}
                </Item>
                <Item label="구매자 이름">
                    {data.buyer_name}
                </Item>
                <Item label="전화번호">
                    {getFieldDecorator('buyer_tel', {
                        initialValue: '',
                        rules: [{required: true, message: '전화번호 입력은 필수입니다.'}],
                    })(
                        <Input size="large" type="number"/>,
                    )}
                </Item>
                <Item label="이메일">
                    {getFieldDecorator('buyer_email', {
                        initialValue: '',
                        rules: [{required: false}],
                    })(
                        <Input size="large"/>,
                    )}
                </Item>
                <Button type="primary" htmlType="submit" size="large">
                    결제하기
                </Button>
            </FormContainer>
        </Wrapper>
    );
}

const Wrapper = styled.div`
  padding: 5rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Header = styled.div`
  font-weight: bold;
  text-align: center;
  padding: 2rem;
  padding-top: 0;
  font-size: 3rem;
`;

const FormContainer = styled(Form)`
  width: 500px;
  border-radius: 3px;

  .ant-row {
    margin-bottom: 1rem;
  }

  .ant-form-item {
    display: flex;
    align-items: center;
  }

  .ant-col.ant-form-item-label {
    padding: 0 11px;
    width: 9rem;
    text-align: left;

    label {
      color: #888;
      font-size: 1.2rem;
    }

    & + .ant-col.ant-form-item-control-wrapper {
      width: 26rem;

      .ant-form-item-control {
        line-height: inherit;
      }
    }
  }

  .ant-col.ant-form-item-label > label::after {
    display: none;
  }

  button[type='submit'] {
    width: 100%;
    height: 5rem;
    font-size: 1.6rem;
    margin-top: 2rem;
  }
`;

const PaymentForm = Form.create({name: 'payment'})(Payment);

export default withUserAgent(withRouter(PaymentForm));
