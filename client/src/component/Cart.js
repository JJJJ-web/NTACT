import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button, Badge } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  ShoppingCartOutlined,
} from '@ant-design/icons';

function Cart() {
  const list = useSelector((store) => store.cartReducer);
  const [cartAnim, setCartAnim] = useState(false);

  useEffect(() => {
    if(list.count !== 0) {
      setCartAnim(true);
      setTimeout(() => {
        setCartAnim(false);
      }, 300);
    }
  }, [list.count]);
  return (
    <CartStyle>
      <Link to="/finalcart">
        <div className={cartAnim ? 'back-animated' : 'back-normal'}>
          <img height="90px" src="/cart.png" alt="cart" />
        </div>
        <div className="cartIcon">
          <ShoppingCartOutlined />
        </div>
        <Badge className="badge" count={list.count} showZero style={{ backgroundColor: 'rgba(0, 0, 0, 0.0)' }} />
      </Link>
    </CartStyle>
  );
}

const CartStyle = styled.div`
  .back-normal {
    position: fixed;
    bottom: 13px;
    right: 13px;
    z-index: 50;
  }
  .back-animated {
    position: fixed;
    bottom: 13px;
    right: 13px;
    z-index: 50;
    transform-origin: top;
    animation: bell 1s linear;
  }
  @keyframes bell {
    0%, 50% {
      transform: rotate(0deg);
    }
    5%, 15%, 25%, 35%, 45% {
      transform: rotate(7deg);
    }
    10%, 20%, 30%, 40% {
      transform: rotate(-7deg);
    }
  }
  
  .cartIcon{
    position: fixed;
    bottom: 7px;
    right: 27px;
    color: white;
    font-size: 65px;
    z-index: 50;
  }
  .badge{
    border-color: blue;
    font-size: 30px;
    width: 40px;
    position: fixed;
    bottom: 52px;
    right: 34px;
    z-index: 70;
  }
`;

export default Cart;