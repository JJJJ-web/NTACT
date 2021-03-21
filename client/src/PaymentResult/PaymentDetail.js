import React, {useEffect, useState} from 'react';
import {Card, Progress, Steps} from 'antd';
import {withRouter, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';
import Header from '../pages/Header';
import axios from 'axios';

function PaymentDetail(orderId) {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
    orderId = 20210321_1616296887979;
    const [orderInfo, setOrderInfo] = useState('');

    function convertOrderType(type) {
        if (type === 'dine-in') {
            return '테이블 식사';
        } else if (type === 'pick-up') {
            return '포장';
        } else {
            return '취식';
        }
    }

    function convertOrderStat(stat) {
        if (stat === 'ready') {
            return '접수 완료';
        } else if (stat === 'accept') {
            return '주문승인';
        } else if (stat === 'in progress') {
            return '조리 중';
        } else if (stat === 'completed') {
            return '조리 완료';
        } else if (stat === 'canceled') {
            return '주문 취소';
        } else if (stat === 'refund') {
            return '환불';
        } else {
            return '?';
        }
    }

    function convertOrderStatPercent(stat) {
        if (stat === 'ready') {
            return 20;
        } else if (stat === 'accept') {
            return 40;
        } else if (stat === 'in progress') {
            return 70;
        } else if (stat === 'completed') {
            return 100;
        } else if (stat === 'canceled') {
            return 0;
        } else if (stat === 'refund') {
            return 0;
        } else {
            return 0;
        }
    }

    useEffect(() => {
        console.log(userId);
        axios.post(`api/payments/${userId}/${orderId}`).
            then((res) => setOrderInfo(res));
    }, []);

    return (
        <>
            <Card title={orderInfo.name} bordered={false}>
                <Progress type="circle" percent={20} width={90} format={() => convertOrderStat( orderInfo.order_stat )}/>
                <div>결제 일시: {orderInfo.date}</div>
                <div>식사: {convertOrderType(orderInfo.order_type)}</div>
                {/*
                    orderInfo.order_detail.map((item) => {
                        return (
                            <div>
                                <span>{item.Name} | </span>
                                <span>기본: {item.Price}원 | </span>
                                <span>{item.Quantity}개 | </span>
                                <span>{item.Price * item.Quantity}원</span>
                            </div>
                        );
                    })
                    */
                }
                <div>총 결제금액: {orderInfo.amount}원</div>
            </Card>
        </>
    );
}

export default withRouter(PaymentDetail);