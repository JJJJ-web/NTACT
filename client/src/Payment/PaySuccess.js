import React, {useEffect, useState} from 'react';
import {Steps} from 'antd';
import {withRouter, useLocation} from 'react-router-dom';
import Header from '../pages/Header';
import ListCard from '../PaymentResult/ListCard';
import axios from 'axios';

function PaySuccess() {
    const location = useLocation();
    const {Step} = Steps;
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;

    if(location.state == null) {
        return(
            <>
                잘못된 접근입니다.
            </>
        );
    } else {
        const orderID = location.state.orderInfo.id;
        let [orderInfo, setOrderInfo] = useState([]);
        let [orderDetails, setOrderDetails] = useState([]);

        async function getList() {
            await axios.post(`/api/payments/${userId}/${orderID}`).
                then((res) => {
                    setOrderInfo(orderInfo = res.data);
                    setOrderDetails(orderDetails = res.data.order_detail);
                });
        }

        useState(() => {
            getList();
        }, []);

        return (
            <>
                <Header/>
                <Steps type='navigation' size='small' current={2} className='site-navigation-steps'>
                    <Step title='상품 확인' status='finish' />
                    <Step title='결제' status='finish' />
                    <Step title='주문 접수' status='process' />
                </Steps>
                <ListCard orderInfo={orderInfo} orderDetails={orderDetails}/>
            </>
        );
    }
}

export default withRouter(PaySuccess);