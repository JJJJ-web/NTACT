import React, {useState} from 'react';
import {Card, Layout, Menu, Progress, List} from 'antd';
import {Link, withRouter} from 'react-router-dom';
import {LeftOutlined} from '@ant-design/icons';
import axios from 'axios';

function PaymentDetail({match}, {orderId =[]}) {
    const userId = JSON.parse(sessionStorage.getItem('userInfo')).userId;
    const [orderInfo, setOrderInfo] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);

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
        } else if (stat === 'in-progress') {
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
        } else if (stat === 'in-progress') {
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

    function formatDate(date) {
        if(date != undefined) {
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
            return (yyyy + '년 ' + mm + '월 ' + dd + '일 ' + ampm + h + ':' + m);
        }
    }

    function formatOnePrice(price) {
        return ('기본: ' + price + '원');
    }

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
            <Card title={orderInfo.name} bordered={false} style={{margin: '10px'}}>
                <List itemLayout="horizontal" style={{margin: '10px'}}>
                    <List.Item>
                        <Progress type="circle" percent={convertOrderStatPercent(orderInfo.order_stat)} format={() => convertOrderStat(orderInfo.order_stat)}/>
                        <List>
                            <div>{formatDate(orderInfo.date)}</div>
                            <div style={{fontSize: '1.3rem'}}>{convertOrderType(orderInfo.order_type)}</div>
                        </List>
                        <p></p><p></p><p></p>
                    </List.Item>
                    {
                        orderDetails.map((item, index) => {
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
                        <p>{orderInfo.amount}원</p>
                    </List.Item>
                </List>
            </Card>
        </div>
    );
}

export default withRouter(PaymentDetail);