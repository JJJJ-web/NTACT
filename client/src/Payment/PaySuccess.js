import React, {useEffect, useState} from 'react';
import {Card, Progress} from 'antd';
import {withRouter, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';
import Header from '../pages/Header';

function PaySuccess() {
    const location = useLocation();

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
                <Card title="결제 완료" bordered={false}>
                    <Progress type="circle" percent={20} width={90} format={() => '주문 접수'}/>
                    <div>결제 일시: {orderData.order_date}</div>
                    <div>식사: {orderData.eat}</div>
                    {
                        orderData.order_detail.map((item) => {
                            return (
                                <div>
                                    <span>{item.Name} | </span>
                                    <span>{item.Quantity}개 | </span>
                                    <span>{item.Price}원</span>
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