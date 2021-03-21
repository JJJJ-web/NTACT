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
        const yyyy = date.slice(0, 4);
        const mm = date.slice(5, 7);
        const dd = date.slice(8, 10);
        const h = date.slice(11, 13);
        const m = date.slice(14, 16);
        const s = date.slice(17, 19);

        return (yyyy + '년 ' + mm + '월 ' + dd + '일 ' + h + ':' + m );
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