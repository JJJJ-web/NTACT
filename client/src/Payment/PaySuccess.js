import React, {useEffect, useState} from 'react';
import {Card, List, Progress, Steps} from 'antd';
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

    function formatOnePrice(price) {
        return ('기본: ' + price + '원');
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
                <Card title="" bordered={false} style={{margin: '10px'}}>
                    <List itemLayout="horizontal">
                        <List.Item>
                            <Progress type="circle" percent={20} format={() => '주문 접수'}/>
                            <List>
                                <div>{orderData.order_date}</div>
                                <div style={{fontSize: '1.3rem'}}>{convertOrderType(orderData.order_type)}</div>
                            </List>
                            <p></p><p></p><p></p>
                        </List.Item>
                        {
                            orderData.order_detail.map((item, index) => {
                                return (
                                    <List.Item key={index}>
                                        <List.Item.Meta title={item.Name} description={formatOnePrice(item.Price)}/>
                                        <List.Item.Meta title={item.Quantity} />
                                        <p>{item.Price * item.Quantity}원</p>
                                    </List.Item>
                                );
                            })
                        }
                        <List.Item style={{fontSize: '1.3rem'}}>
                            <p>총 결제금액</p>
                            <p>{orderData.total_price}원</p>
                        </List.Item>
                    </List>
                </Card>
            </>
        );
    }
}

export default withRouter(PaySuccess);