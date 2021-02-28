import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';
import {CreditCardOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

function Cart() {
    const cart = useSelector((store) => store.cartReducer);
    const list = []; 
    const res = [];
    const arr = Object.create(null);
    let sum = 0;

    const cartItem = cart.length >= 1 ? cart.map((item, idx) => {
        sum += item.price;

        return (
            <span className="items" key={idx} item={item} idx={idx}>
                <img src={item.img_url} height='100em'/>
                <div>{item.name_kor}</div>
                <div>{item.price}원</div>
            </span>
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

    console.log(res);

    return (
        <>
            <CartMenus>
                {cartItem}
            </CartMenus>

            <CartSum>
                <div>금 액 : {sum}원</div><br />
                <Link to= {{
                    pathname: '/finalcart',
                    state: {sum, res},
                }}>
                    <Button type="primary" shape="round" icon={<CreditCardOutlined />} size="large">
                        결제하기
                    </Button>
                </Link>
            </CartSum>
        </>
    );
}
const CartMenus = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: calc((100%) - 150px);
  height: 100%;
  white-space:nowrap;
  overflow-x: auto;
  
  .items{
    display: inline-block;
    padding: 0rem 1rem;
    border-right: 1px solid gray;
  }
`;

const CartSum = styled.div`
  text-align: right;
  position: absolute;
  bottom: 0px;
  right: 0px;
  width: 150px;
  height: 100%;
  padding-top: 30px;
  padding-right: 10px;
  border-left: 1px solid black;
  
`;
export default Cart;