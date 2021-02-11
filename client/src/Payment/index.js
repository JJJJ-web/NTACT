import React, {useState} from 'react';
import styled from 'styled-components';
import {Form, Select, Icon, Input, Switch, Button} from 'antd';
import {withRouter} from 'react-router-dom';
import {withUserAgent} from 'react-useragent';
import queryString from 'query-string';

import {
    PGS,
    METHODS_FOR_INICIS,
    QUOTAS_FOR_INICIS_AND_KCP,
} from './constants';
import {getMethods, getQuotas} from './utils';

const {Item} = Form;
const {Option} = Select;

function Payment({history, form}) {
    const [methods, setMethods] = useState(METHODS_FOR_INICIS);
    const [quotas, setQuotas] = useState(QUOTAS_FOR_INICIS_AND_KCP);
    const [isQuotaRequired, setIsQuotaRequired] = useState(true);
    const [isDigitalRequired, setIsDigitalRequired] = useState(false);
    const [isVbankDueRequired, setIsVbankDueRequired] = useState(false);
    const [isBizNumRequired, setisBizNumRequired] = useState(false);
    const {
        getFieldDecorator,
        validateFieldsAndScroll,
        setFieldsValue,
        getFieldsValue,
    } = form;
    const data = {
        pg: 'html5_inicis', // PG사
        pay_method: 'card', // 결제수단
        merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
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
                const userCode = 'imp92963329';
                /* 결제 데이터 */
                const {
                    pg,
                    payMethod,
                    merchantUid,
                    amount,
                    buyerName,
                    buyerTel,
                    buyerEmail,
                    cardQuota,
                    bizNum,
                    vbankDue,
                    digital,
                } = values;


                if (payMethod === 'vbank') {
                    data.vbankDue = vbankDue;
                    if (pg === 'danal_tpay') {
                        data.bizNum = bizNum;
                    }
                }
                if (payMethod === 'card') {
                    if (cardQuota !== 0) {
                        data.digital = {
                            cardQuota: cardQuota === 1 ? [] : cardQuota,
                        };
                    }
                }
                if (payMethod === 'phone') {
                    data.digital = digital;
                }

                /* 웹 환경일때 */
                const {IMP} = window;
                IMP.init(userCode);
                IMP.request_pay(data, callback);
            }
        });
    }

    function callback(response) {
        const query = queryString.stringify(response);
        if (response.success) { // 결제 성공 시
            axios({
                url: 'http://localhost:4000/api/payment/index', // 가맹점 서버
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
                case 'vbankIssued':
                    // 가상계좌 발급 시 로직
                    break;
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

    function onChangePg(value) {
        /* 결제수단 */
        const methods = getMethods(value);
        setMethods(methods);
        setFieldsValue({payMethod: methods[0].value});

        /* 할부개월수 설정 */
        const {payMethod} = getFieldsValue();
        handleQuotas(value, payMethod);

        /* 사업자번호/입금기한 설정 */
        let isBizNumRequired = false;
        let isVbankDueRequired = false;
        if (payMethod === 'vbank') {
            if (value === 'danal_tpay') {
                isBizNumRequired = true;
            }
            isVbankDueRequired = true;
        }
        setisBizNumRequired(isBizNumRequired);
        setIsVbankDueRequired(isVbankDueRequired);
    }

    function onChangePayMethod(value) {
        const {pg} = getFieldsValue();
        let isQuotaRequired = false;
        let isDigitalRequired = false;
        let isVbankDueRequired = false;
        let isBizNumRequired = false;
        switch (value) {
        case 'card': {
            isQuotaRequired = true;
            break;
        }
        case 'phone': {
            isDigitalRequired = true;
            break;
        }
        case 'vbank': {
            if (pg === 'danal_tpay') {
                isBizNumRequired = true;
            }
            isVbankDueRequired = true;
            break;
        }
        default:
            break;
        }
        setIsQuotaRequired(isQuotaRequired);
        setIsDigitalRequired(isDigitalRequired);
        setIsVbankDueRequired(isVbankDueRequired);
        setisBizNumRequired(isBizNumRequired);

        /* 할부개월수 설정 */
        handleQuotas(pg, value);
    }

    function handleQuotas(pg, payMethod) {
        const {isQuotaRequired, quotas} = getQuotas(pg, payMethod);
        setIsQuotaRequired(isQuotaRequired);
        setQuotas(quotas);
        setFieldsValue({cardQuota: quotas[0].value});
    }

    return (
        <Wrapper>
            <Header>아임포트 결제 테스트</Header>
            <FormContainer onSubmit={handleSubmit}>
                <Item label="PG사">
                    {getFieldDecorator('pg', {
                        initialValue: data.pg,
                    })(
                        <Select
                            size="large"
                            onChange={onChangePg}
                            suffixIcon={<Icon type="caret-down"/>}
                        >
                            {PGS.map((pg) => {
                                const {value, label} = pg;
                                return <Option value={value} key={value}>{label}</Option>;
                            })}
                        </Select>,
                    )}
                </Item>
                <Item label="결제수단">
                    {getFieldDecorator('payMethod', {
                        initialValue: 'card',
                    })(
                        <Select
                            size="large"
                            onChange={onChangePayMethod}
                            suffixIcon={<Icon type="caret-down"/>}
                        >
                            {methods.map((method) => {
                                const {value, label} = method;
                                return <Option value={value} key={value}>{label}</Option>;
                            })}
                        </Select>,
                    )}
                </Item>

                <Item>
                    {getFieldDecorator('amount', {
                        initialValue: '39000',
                        rules: [{required: true, message: '결제금액은 필수입력입니다'}],
                    })(
                        <Input size="large" type="number" addonBefore="결제금액"/>,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('merchantUid', {
                        initialValue: `min_${new Date().getTime()}`,
                        rules: [{required: true, message: '주문번호는 필수입력입니다'}],
                    })(
                        <Input size="large" addonBefore="주문번호"/>,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('buyerName', {
                        initialValue: '홍길동',
                        rules: [{required: true, message: '구매자 이름은 필수입력입니다'}],
                    })(
                        <Input size="large" addonBefore="이름"/>,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('buyerTel', {
                        initialValue: '01012341234',
                        rules: [{required: true, message: '구매자 전화번호는 필수입력입니다'}],
                    })(
                        <Input size="large" type="number" addonBefore="전화번호"/>,
                    )}
                </Item>
                <Item>
                    {getFieldDecorator('buyerEmail', {
                        initialValue: 'example@example.com',
                        rules: [{required: true, message: '구매자 이메일은 필수입력입니다'}],
                    })(
                        <Input size="large" addonBefore="이메일"/>,
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
  width: 350px;
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

  .ant-row.ant-form-item.toggle-container .ant-form-item-control {
    padding: 0 11px;
    height: 4rem;
    display: flex;
    align-items: center;

    .ant-switch {
      margin: 0;
    }
  }

  .ant-form-explain {
    margin-top: 0.5rem;
    margin-left: 9rem;
  }

  .ant-input-group-addon:first-child {
    width: 9rem;
    text-align: left;
    color: #888;
    font-size: 1.2rem;
    border: none;
    background-color: inherit;
  }

  .ant-input-group > .ant-input:last-child {
    border-radius: 4px;
  }

  .ant-col {
    width: 100%;
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
