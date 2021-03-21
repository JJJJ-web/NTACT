import React, {useEffect, useState} from 'react';
import {Card, Progress, Steps} from 'antd';
import {withRouter, useLocation} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';
import Header from '../pages/Header';
import axios from 'axios';

function PaymentHistory() {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
    const [histories, setHistories] = useState('');

    useState(() => {
        console.log(userId);
        axios.post(`api/payments/${userId}`,
            {
            }).then((res) => {
            if (res.status === 200) {
                setHistories(res);
                console.log(histories);
            } else {
                window.alert('실패111');
            }
        });

        // axios.post(`api/payments/${userId}`).then((res) => setHistories(res));
    }, []);

    return (
        <>
            <Header/>
            <div>
                {/*
                    histories.map((item) => {
                        return (
                            <div onClick={()=> history.push({
                                pathname: '/payment/history_details',
                                state: {orderId: response},
                            })}>
                                <span>{item.Name} | </span>
                                <span>{item.amount}원 | </span>
                                <span>{item.date} | </span>
                            </div>
                        );
                    })
                    */
                }
            </div>
        </>
    );
}

export default withRouter(PaymentHistory);