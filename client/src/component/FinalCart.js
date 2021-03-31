import React from 'react';
import Payment from '../Payment/index';
import {Steps, Divider, Button} from 'antd';
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {useDispatch, useSelector} from 'react-redux';
import {deleteCart, increment, decrement} from '../store/actions';
import styled from 'styled-components';
import Header from '../pages/Header';

function FinalCart() {
    const {Step} = Steps;
    const ButtonGroup = Button.Group;
    const dispatch = useDispatch();
    const cart2 = useSelector((store) => store.cartReducer);

    const list = cart2.cart.map((item, idx) => {
        return (
            <div key={idx} className='item' item={item}>
                <Button className='delete' type='text' onClick={() => dispatch(deleteCart(item))}>x</Button>
                <div className='itemName'>{item.Name}</div>
                <ButtonGroup className='button'>
                    <Button onClick={() => dispatch(decrement(item))} min={1}>
                        <MinusOutlined />
                    </Button>
                    <Button>
                        {item.Quantity}
                    </Button>
                    <Button onClick={() => dispatch(increment(item))}>
                        <PlusOutlined />
                    </Button>
                </ButtonGroup>
                <div className='price'>{item.Price}</div>
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
                <div className='finalSum'>총 주문 금액:&nbsp;{cart2.total} &nbsp;원</div>
                <div className='line' />
                <Payment sumAmount={cart2.total} cartItems={cart2.cart} />
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
    .itemName {
        font-size: 17px;
        font-weight: bold;
    }
    .price {
        float: right;
        margin-right: 30px;
        margin-top: 30px;
        font-size: 15px;
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
        background-color: #ffb400;
        height: 0.2rem;
    }
`;
export default FinalCart;