import React, {useEffect, useState} from 'react';
import {Card, Col, Row, Button, Select} from 'antd';
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

    function changeStaus() {
        if(status === 'ready') {
            setChange('in-progress');
        } else if(status === 'in-progress') {
            setChange('completed');
        }
    }

    async function changeStateHandler(item) {
        changeStaus();
        console.log(change);
        await axios.patch(`/api/orders/${status}/${item.id}`, {
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

    return (
        <DivList>
            {
                data.map((item) => {
                    return (
                        <div className='cardList'>
                            <Card title={item.id} style={{width: 300}} className='items' bodyStyle={{height: 500}} headStyle={{fontSize: 20}}>
                                <div key={item.id}>
                                    <span className='order_type'>{item.order_type}</span>
                                    <br />
                                    <p className='date'>{item.date}</p>
                                    <hr />
                                    <div>
                                        {
                                            item.order_detail.map((order) => {
                                                return(
                                                    <div key={order.Id}>
                                                        <p className='menu'>{order.Name}&nbsp;&nbsp;&nbsp;&nbsp;{order.Quantity}</p>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                    <div className='select'>
                                        <Select defaultValue={10} style={{width: 105}} onChange={changeValue}>
                                            <Option value={5}>5</Option>
                                            <Option value={10}>10</Option>
                                            <Option value={15}>15</Option>
                                            <Option value={20}>20</Option>
                                        </Select>
                                        <Button type='primary' className='Button' onClick={()=> changeStateHandler(item)}> 다음 단계로 </Button>
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
        color: green;
        font-weight: bold;
        font-size: 30px;
    }

    .date {
        font-size: 20px;
    }

    .menu {
        font-size: 18px;
    }
    Button {
        margin-left: 25px;
    }
`;

export default ShopList;