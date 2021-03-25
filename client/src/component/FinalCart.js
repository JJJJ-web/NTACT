import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Payment from '../Payment/index';
import {Steps, Divider, Button} from 'antd';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch} from 'react-redux';
import {deleteCart} from '../store/actions';
import styled from 'styled-components';
import Header from '../pages/Header';

function FinalCart() {
    const cart = useLocation();
    const [finalSum, setfinalSum] = useState(cart.state.sum);
    const [finalRes, setfinalRes] = useState([]);
    const {Step} = Steps;
    const ButtonGroup = Button.Group;
    const dispatch = useDispatch();

    useEffect(() => {
        setfinalSum(finalSum);
        setfinalRes(cart.state.res);
    });

    const onIncrease = (idx) => {
        setfinalRes(finalRes[idx]['Quantity'] += 1);
        totalSum(finalRes);
    };

    const onDecrease = (idx) => {
        if(finalRes[idx].Quantity > 1) {
            setfinalRes(
                finalRes[idx]['Quantity'] -= 1,
            );
        }
        totalSum(finalRes);
    };

    const totalSum = (cart) => {
        let total = 0;

        Object.keys(cart).map((item) => {
            total += finalRes[item].Price * finalRes[item].Quantity;
        });
        setfinalSum(total);
    };

    const removeHandler = (idx) => {
        const list = deleteCart(finalRes[idx]['Id']);
        const x = finalSum - (finalRes[idx]['Quantity'] * finalRes[idx]['Price']);
        alert('삭제 되었습니다.');
        setfinalRes(list);
        setfinalSum(x);
    };

    const list = Object.keys(finalRes).map((item, idx) => {
        return (
            <div key={idx} className='item'>
                <Button className='delete' type='text' onClick={() => removeHandler(idx)}>x</Button>
                <div>{finalRes[item].Name}</div>
                <ButtonGroup className='button'>
                    <Button onClick={() => onDecrease(idx)} min={1}>
                        <MinusOutlined />
                    </Button>
                    <Button>
                        {finalRes[item].Quantity}
                    </Button>
                    <Button onClick={() => onIncrease(idx)}>
                        <PlusOutlined />
                    </Button>
                </ButtonGroup>
                <div className='price'>{finalRes[item].Price}</div>
                <Divider className='divider'/>
            </div>
        );
    });

    return (
        <>
            <Header/>
            <StepsBar>
                <Steps type='navigation' size='small' current={0} className='site-navigation-steps'>
                    <Step title='상품 확인' status='process' />
                    <Step title='결제' status='wait' />
                    <Step title='주문 접수' status='wait' />
                </Steps>
                <div className='menucnt'>담은 메뉴: {list.length}개</div>
                <hr />
                <div>{list}</div>
                <div className='line' />
                <div className='finalSum'>총 주문 금액: {finalSum}</div>
                <div className='line' />
                <Payment sumAmount={finalSum} cartItems={finalRes} />
            </StepsBar>
        </>
    );
}

const StepsBar = styled.div `
    display: inline;

    .finalSum {
        font-size: 1.5rem;
    }

    .button {
        margin-top: 10px;
    }
    .delete {
        float: right;
    }

    .price {
        float: right;
        margin-right: 30px;
        margin-top: 30px;
    }
    .divider {
        margin: 30px;
    }
    .menucnt {
        text-align: center;
        margin-top: 8px;
    }
    .site-navigation-steps {
        margin-bottom: 2px;
        box-shadow: 0px -1px 0 0 #e8e8e8 inset;
    }
    .line {
        background-color: black;
        height: 0.2rem;
    }
`;
export default FinalCart;