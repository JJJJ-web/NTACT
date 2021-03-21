import React, {useEffect, useState} from 'react';
import {Card, Progress, Steps} from 'antd';
import {withRouter, useHistory, Link} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';
import Header from '../pages/Header';
import axios from 'axios';

function PaymentHistory() {
    const history = useHistory();
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        axios.post(`/api/payments/${userId}`).then((res) => setHistories(res.data));
    }, []);

    function formatDate(date) {
        const time = new Date(date);
        const yyyy = time.getFullYear();
        const mm = time.getMonth() + 1;
        const dd = time.getDate();
        let h = time.getHours();
        const ampm = h >= 12 ? '오후 ' : '오전 ';
        h = h >= 10 ? h : '0' + h;
        let m = time.getMinutes();
        m = m >= 10 ? m : '0' + m;
        const s = time.getSeconds();
        return (yyyy + '년 ' + mm + '월 ' + dd + '일 ' + ampm + h + ':' + m );
    }

    return (
        <div style={{backgroundColor: '#eeeeee', height: '100vh'}}>
            <Header/>
            <div>
                {
                    histories.map((item) => {
                        return (
                            <Card title={item.name} extra={<Link to={`/payment/history/${item.id}`} key={item.id}>주문 상세</Link>} style={{margin: '10px'}}>
                                <h2>{item.amount}원</h2>
                                <p>{formatDate(item.date)}</p>
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default withRouter(PaymentHistory);