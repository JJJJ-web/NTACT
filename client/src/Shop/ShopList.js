import React, {useEffect, useState} from 'react';
import {Card, Button, Select, List, Popconfirm, message} from 'antd';
import axios from 'axios';
import styled from 'styled-components';
import SituationManage from './SituationManage';
import socket from '../SocketInfo';

function ShopList(props) {
    const {Option} = Select;
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(props.status);
    const [value, setValue] = useState(10);
    const [change, setChange] = useState(status);
    const text = '해당 주문을 취소하겠습니까?';

    useEffect(() => { // 역순 출력
        getList();
    }, []);

    async function getList() {
        axios.get(`/api/orders/${status}`).then((res) => setData(res.data.reverse()));
        console.log('getList 완료');
    }

    function changeStatus(item) { // 주문 진행 상태 변경
        if(item.order_stat === 'ready') {
            setChange('in-progress');
        } else if(item.order_stat === 'in-progress') {
            setChange('completed');
        }
    }

    async function changeStateHandler(item) { // <> server 주문 진행 상태 변경
        changeStatus(item);

        await axios.patch(`/api/orders/${item.id}`, {
            headers: {
                status: change,
            },
        }).then((res) => {
            if(res.status === 200) {
                socket.emit('B', {userID: item.buyer_id});
                alert('전송완료');
                getList();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    async function cancelHandler(item) { // 주문 취소: server에 주문 상태 변경
        setChange('canceled');

        await axios.patch(`/api/orders/${item.id}`, {
            headers: {
                status: change,
            },
        }).then((res) => {
            if(res.status === 200) {
                if(item.order_stat === 'ready') {
                    item.order_stat = 'canceled';
                }
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    function cancelPay(item) { // 주문 취소 <> server
        axios({
            url: '/api/payments/cancel',
            method: 'POST',
            headers: {
            },
            data: {
                merchant_uid: item.id,
            },
        }).then((res) => {
            if(res.status === 200) {
                message.success('주문이 취소되었습니다.');
            } else if (res.status === 400) {
                console.log(res);
                message.success('유효하지 않은 요청입니다.');
            } else {
                console.log(res);
                alert('환불 실패');
            }
        }).catch((error) => {
            console.log(error);
            alert('환불 실패');
        });
    }

    function canceledMenu(item) { // 주문 취소 및 환불
        if(item.order_stat === 'ready') {
            cancelPay(item);
            cancelHandler(item);
        } else {
            message.warning('조리 중에는 주문을 취소할 수 없습니다.');
        }
    }

    function formatDate(date) {
        if(date != undefined) {
            const time = new Date(date);
            let h = time.getHours();
            const ampm = h >= 12 ? '오후 ' : '오전 ';
            h = h >= 12 ? h -= 12 : h;
            let m = time.getMinutes();
            m = m >= 10 ? m : '0' + m;
            const s = time.getSeconds();
            return (ampm + h + '시 ' + m + '분');
        }
    }

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
            return '#fda200';
        } else if (type === 'pick-up') {
            return '#87bd00';
        } else {
            return '#8b8b8b';
        }
    }
    function checkOrderStat(stat) {
        if (stat === 'ready' || stat === 'in-progress') {
            return false;
        } else {
            return true;
        }
    }
    function returnStat(stat) {
        if (stat === 'ready') {
            return '조리 시작';
        } else if (stat === 'in-progress') {
            return '조리 완료';
        } else {
            return '완료';
        }
    }
    function chectStatReady(stat) {
        if (stat === 'ready') {
            return 'visible';
        } else {
            return 'hidden';
        }
    }
    return (
        <>
            <DivList>
                {
                    data.map((item, index) => {
                        console.log('리렌더링');
                        return (
                            <div className='cardList' key={index}>
                                <Card title={item.id} style={{width: 300}} className='items' bodyStyle={{height: 500}} headStyle={{fontSize: 20}}>
                                    <div>
                                        <b className='order_type' style={{color: colorOrderType(item.order_type)}}>{convertOrderType( item.order_type)}</b>
                                        <span className='date'>{formatDate(item.date)}</span>
                                        <div>
                                            <Popconfirm onConfirm={() => canceledMenu(item)} title={text} okText={'확인'} cancelText={'닫기'} className='reject'>
                                                <Button style={{visibility: chectStatReady(item.order_stat)}} danger type='primary'>주문 취소</Button>
                                            </Popconfirm>
                                        </div>
                                        <hr/>
                                        <List itemLayout="vertical">
                                            {
                                                item.order_detail.map((order, index) => {
                                                    return (
                                                        <List.Item key={index}>
                                                            <span className='menu'>{order.Name}</span>
                                                            <b className='quantity'>{order.Quantity}</b>

                                                        </List.Item>
                                                    );
                                                })
                                            }
                                        </List>
                                        <div className='select'>
                                            <Select defaultValue={10} onChange={(e)=>setValue(e)} style={{width: 105, visibility: chectStatReady(item.order_stat)}}>
                                                <Option value={5}>5</Option>
                                                <Option value={10}>10</Option>
                                                <Option value={15}>15</Option>
                                                <Option value={20}>20</Option>
                                            </Select>
                                            <Button type='primary' disabled={checkOrderStat(item.order_stat)} className='Button' onClick={() => changeStateHandler(item)}>{returnStat(item.order_stat)}</Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        );
                    })
                }
            </DivList>,
            <SituationManage/>
        </>
    );
}

const DivList = styled.div`
  display: flex;
  justify-content: flex-start;
  overflow-x: auto;
  white-space: nowrap;
  height: 600px;

  .order_type {
    font-size: 2rem;
  }

  .reject {
      left: 50%;
  }

  .date {
    position: relative;
    left: 10px;
    color: #0062ff;
    font-size: 1rem;
  }

  .menu {
    font-size: 1.1rem;
  }

  .quantity {
    position: absolute;
    right: 10px;
    font-size: 1.3rem;
  }
  .select{
    position: absolute;
    bottom: 30px;
  }
  Button {
    margin-left: 25px;
  }
`;

export default ShopList;