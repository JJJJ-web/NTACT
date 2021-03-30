import React from 'react';
import {Link} from 'react-router-dom';
import {Button, Badge} from 'antd';
import {CreditCardOutlined} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import styled from 'styled-components';

function Cart() {
    const list = useSelector((store) => store.cartReducer);
    
    const cartItem = list.cart.map((item, idx) => {
        return (
            <span className="items" key={idx} item={item} idx={idx}>
                <Badge count={item.Quantity} className='badge'/>
                <img src={item.Img} height='100em'/>
                <div>{item.Name}</div>
                <div>{item.Price}원</div>
            </span>
        );
    });

    return (
        <>
            <CartMenus>
                {cartItem}   
            </CartMenus>

            <CartSum>
                <div>금 액 : {list.total}원</div><br />
                <Link to='/finalcart'>
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
  
  .badge {
      float: right;
  }
  
  .items{
    display: inline-block;
    padding: 0rem 1rem;
    border-right: 1px solid gray;
  }

  .empty {
      margin-top: 10px;
      text-align: center;
      font-size: 17px;
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