import React, {useState} from 'react';
import {Card, Layout, Menu, Progress, List, Button, Popover} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {LeftOutlined} from '@ant-design/icons';
import axios from 'axios';
import ListCard from './ListCard';

function PaymentDetail({match}, {orderId =[]}) {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
    const [orderInfo, setOrderInfo] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

    useState(() => {
        orderId = match.params.orderId;
        axios.post(`/api/payments/${userId}/${orderId}`).
            then((res) => {
                setOrderInfo(res.data);
                setOrderDetails(res.data.order_detail);
            });
    }, []);

    return (
        <div style={{backgroundColor: '#eeeeee', minHeight: '100vh'}}>
            <Layout>
                <Menu theme="dark" mode="horizontal" theme="light" style={{lineHeight: '30px', backgroundColor: '#FFF8EA'}}>
                    <Menu.Item key="1">
                        <Link to='/payment/history'>
                            <LeftOutlined />뒤로가기
                        </Link>
                    </Menu.Item>
                </Menu>
            </Layout>
            <ListCard orderInfo={orderInfo} orderDetails={orderDetails}/>
        </div>
    );
}

export default withRouter(PaymentDetail);