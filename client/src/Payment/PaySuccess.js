import React, {useEffect, useState} from 'react';
import {Card, Progress, Steps} from 'antd';
import {withRouter, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';
import Header from '../pages/Header';

function PaySuccess() {
    const location = useLocation();
    const {Step} = Steps;

    function convertOrderType(type) {
        if(type==='dine-in') {
            return '테이블 식사';
        } else if(type==='pick-up') {
            return '포장';
        } else {
            return '취식';
        }
    }
    if(location.state == null) {
        return(
            <>
                잘못된 접근입니다.
            </>
        );
    } else {
        const orderData = location.state.orderData;
        useEffect(() => {
            console.log('order data : ', orderData);
        });

        return (
            <>
                <Header/>
                <Steps type='navigation' size='small' current={2} className='site-navigation-steps'>
                    <Step title='상품 확인' status='finish' />
                    <Step title='결제' status='finish' />
                    <Step title='주문 접수' status='process' />
                </Steps>
                <Card title="결제 완료" bordered={false}>
                    <Progress type="circle" percent={20} width={90} format={() => '주문 접수'}/>
                    <div>결제 일시: {orderData.order_date}</div>
                    <div>식사: {convertOrderType(orderData.order_type)}</div>
                    {
                        orderData.order_detail.map((item) => {
                            return (
                                <div>
                                    <span>{item.Name} | </span>
                                    <span>기본: {item.Price}원 | </span>
                                    <span>{item.Quantity}개 | </span>
                                    <span>{item.Price * item.Quantity}원</span>
                                </div>
                            );
                        })
                    }
                    <div>총 결제금액: {orderData.total_price}원</div>
                </Card>
            </>
        );
    }
}

export default withRouter(PaySuccess);