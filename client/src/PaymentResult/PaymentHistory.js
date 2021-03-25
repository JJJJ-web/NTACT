import React, {useEffect, useState} from 'react';
import {Card, Avatar} from 'antd';
import {withRouter, useHistory, Link} from 'react-router-dom';
import Header from '../pages/Header';
import axios from 'axios';
const {Meta} = Card;

function PaymentHistory() {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
    const [histories, setHistories] = useState([]);

    useEffect(() => {
        axios.post(`/api/payments/${userId}`).then((res) => setHistories(res.data));
    }, []);

    function convertOrderType(type) {
        if (type === 'dine-in') {
            return '테이블';
        } else if (type === 'pick-up') {
            return '포장';
        } else {
            return '-';
        }
    }

    function colorOrderType(type) {
        if (type === 'dine-in') {
            return '#fdb916';
        } else if (type === 'pick-up') {
            return '#a2d52a';
        } else {
            return '#adadad';
        }
    }

    function formatPrice(price) {
        return (price + '원');
    }

    return (
        <div style={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
            <Header/>
            <div>
                {
                    histories.map((item) => {
                        return (
                            <Card key={item.id} title={item.name} extra={<Link to={`/payment/history/${item.id}`}>주문 상세</Link>} style={{margin: '10px'}}>
                                <Meta
                                    avatar={<Avatar shape="square" size={60} style={{
                                        color: '#ffffff',
                                        backgroundColor: colorOrderType(item.order_type),
                                    }}>{convertOrderType(item.order_type)}</Avatar>}
                                    title={formatPrice(item.amount)}
                                    description={new Date(item.date).toLocaleString()}
                                />
                            </Card>
                        );
                    })
                }
            </div>
        </div>
    );
}

export default withRouter(PaymentHistory);