import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Select, List} from 'antd';
import axios from 'axios';
import styled from 'styled-components';

function ShopList(props) {
    const {Option} = Select;
    const [data, setData] = useState([]);
    const [status, setStatus] = useState(props.status);
    const [value, setValue] = useState(10);
    const [change, setChange] = useState(status);

    useEffect(() => { // 역순 출력
        axios.get(`/api/orders/${status}`).then((res) => setData(res.data.reverse()));
    }, []);

    function changeStaus(item) {
        if(item.order_stat === 'ready') {
            setChange('in-progress');
        } else if(item.order_stat === 'in-progress') {
            setChange('completed');
        }
    }

    async function changeStateHandler(item) {
        changeStaus(item);
        console.log(change);

        await axios.patch(`/api/orders/${item.id}`, {
            headers: {
                status: change,
            },
        }).then((res) => {
            if(res.status === 200) {
                if(item.order_stat === 'ready') {
                    item.order_stat = 'in-progress';
                } else if(item.order_stat === 'in-progress') {
                    item.order_stat = 'completed';
                }
                console.log(res.order_stat);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    function changeValue(value) {
        setValue(value);
    }

    function formatDate(date) {
        if(date != undefined) {
            const time = new Date(date);
            let h = time.getHours();
            const ampm = h >= 12 ? '오후 ' : '오전 ';
            h = h >= 10 ? h : '0' + h;
            let m = time.getMinutes();
            m = m >= 10 ? m : '0' + m;
            const s = time.getSeconds();
            return (ampm + h + '시' + m + '분');
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

    return (
        <DivList>
            {
                data.map((item) => {
                    return (
                        <div className='cardList'>
                            <Card title={item.id} style={{width: 300}} className='items' bodyStyle={{height: 500}} headStyle={{fontSize: 20}}>
                                <div key={item.id}>
                                    <b className='order_type' style={{color: colorOrderType(item.order_type)}}>{convertOrderType( item.order_type)}</b>
                                    <span className='date'>{formatDate(item.date)}</span>
                                    <hr/>
                                    <List itemLayout="vertical">
                                        {
                                            item.order_detail.map((order) => {
                                                return (
                                                    <List.Item>
                                                        <span className='menu'>{order.Name}</span>
                                                        <b className='quantity'>{order.Quantity}</b>

                                                    </List.Item>
                                                );
                                            })
                                        }
                                    </List>
                                    <div className='select'>
                                        <Select defaultValue={10} style={{width: 105}} onChange={changeValue}>
                                            <Option value={5}>5</Option>
                                            <Option value={10}>10</Option>
                                            <Option value={15}>15</Option>
                                            <Option value={20}>20</Option>
                                        </Select>
                                        <Button type='primary' className='Button' onClick={() => changeStateHandler(item)}> 다음 단계로 </Button>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    );
                })
            }
        </DivList> 
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