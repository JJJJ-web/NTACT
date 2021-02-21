import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import {useSelector} from 'react-redux';

function Cart() {
    const cart = useSelector((store) => store.cartReducer);
    let sum = 0;

    const cartItem = cart.length >= 1 ? cart.map((item, idx) => {
        sum += item.price;

        return (
            <div key={idx} item={item} idx={idx}>
                <div>{item.name_kor}</div>
            </div>   
        );
    }) : <div>장바구니가 비어있습니다.</div>;

    console.log(cartItem);

    return (
        <div>
            <br />
            <hr />
            <h3>장바구니 화면입니다.</h3>
            <div>
                {cartItem}
            </div>

            <div className='cartStyle'>
                <div>금 액 : {sum}</div><br />
                <Link to= {{
                    pathname: '/finalcart',
                    state: {sum},
                }}>
                    <div><button>결제하기</button></div>
                </Link>
            </div>
        </div>
    );
}

export default Cart;