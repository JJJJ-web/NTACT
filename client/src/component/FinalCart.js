import React, {useEffect, useState} from 'react';
import {Link, useHistory, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Payment from '../Payment/index';

function FinalCart() {
    const history = useHistory();
    const cart = useSelector((store) => store.cartReducer);
    const sum = useLocation();
    // let [sumAmount, setSumAmount] = useState(1);

    const cartItem = cart.length >= 1 ? cart.map((item, idx) => {
        return (
            <div key={item.id} item={item} idx={idx}>
                <div>{item.name_kor}</div>
                <div>{item.price}</div>
                <br />
            </div>
        );
    }) : <div>장바구니가 비어있습니다.</div>;

    const sendMenuList = () => {
        axios.post('/api/payments/order',
            {
                cart: cart,
                sum: sum.state.sum,
            }).then((res) => {
            if (res.status === 200) {
                window.alert('전송 성공');
            }
        });
    };
    console.log('기존', cart);
    return (
        <>
            <div>
                <h3>최종 장바구니 화면입니다.</h3>
                <div>{cartItem}</div>
                <div>총 금 액 : {JSON.stringify(sum.state.sum)}</div>
                <br />
                <hr />
                <div><button onClick={sendMenuList}>결제하기</button></div>
            </div>,
            <Payment sumAmount={sum.state.sum} cartItems={cart} />
        </>
    );
}

export default FinalCart;