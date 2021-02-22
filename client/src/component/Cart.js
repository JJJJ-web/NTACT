import React from 'react';
import {Link} from 'react-router-dom';
import '../App.css';
import {useSelector} from 'react-redux';

function Cart() {
    const cart = useSelector((store) => store.cartReducer);
    const list = []; 
    const res = [];
    const arr = Object.create(null);
    let sum = 0;

    const cartItem = cart.length >= 1 ? cart.map((item, idx) => {
        sum += item.price;

        return (
            <div key={idx} item={item} idx={idx}>
                <div>{item.name_kor}</div>
            </div>
        );
    }) : <div>장바구니가 비어있습니다.</div>;

    for(let i = 0; i < cart.length; i++) { 
        const json = Object.create(null);
        json.Id = cart[i].id;
        json.Name = cart[i].name_kor;
        json.Price = cart[i].price;

        list.push(json);
    }

    for(let i = 0; i < list.length; i++) {
        if(!arr[list[i].Id]) {
            res.push(list[i]);
        }
        arr[list[i].Id] = ((arr[list[i].Id] || 0) + 1);
    }

    for (let j = 0; j < res.length; j++) {
        res[j].Quantity = arr[res[j].Id];
    }

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
                    state: {sum, res},
                }}>
                    <div><button>결제하기</button></div>
                </Link>
            </div>
        </div>
    );
}

export default Cart;