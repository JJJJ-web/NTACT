import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import axios from 'axios';

function FinalCart() {
    const cart = useSelector((store) => store.cartReducer);
    const sum = useLocation();

    const cartItem = cart.length >= 1 ? cart.map((item, idx) => {
        return (
            <div key={item.id} item={item} idx={idx}>
                <div>{item.name_kor}</div>
                <div>{item.price}</div>
                <br />
            </div>
        );
    }) : <div>장바구니가 비어있습니다.</div>;

    console.log(cart);

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

    return (
        <div>
            <h3>최종 장바구니 화면입니다.</h3>
            <div>총 금 액 : {JSON.stringify(sum.state.sum)}</div>
            <br />
            <hr />
            <div>{cartItem}</div>
            <div><button onClick={sendMenuList}>결제하기</button></div>
        </div>
    );
}

export default FinalCart;