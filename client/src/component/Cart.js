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
          <img
            width="90px"
            className="back-image"
            src="/cart.png"
            alt="cart"
          />
        </div>
        <div className="cartIcon">
          <ShoppingCartOutlined />
        </div>
        <Badge className="badge" count={list.count} showZero />
      </Link>
    </CartStyle>
  );
}

const CartStyle = styled.div`
  
  .back-normal {
    position: fixed;
    bottom: 11px;
    right: 11px;
    z-index: 50;
  }

  .back-animated {
    position: fixed;
    bottom: 11px;
    right: 11px;
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
  
  .ant-badge-count {
    position: fixed;
    bottom: 56px;
    right: 28px;
    z-index: 70;
    background: white;
    color: #ffb400;
    height: 1.7rem;
    width: 1.6rem;
    border-radius: 1.7rem;
    font-size: 1.2rem;
    font-weight: bold;
    box-shadow: 0 0 0 white;
    padding: 0.15rem 0;
  }

  .cartIcon {
    position: fixed;
    bottom: 15px;
    right: 35px;
    color: white;
    font-size: 3rem;
    z-index: 60;
  }

  @media (max-width: 341px) {
    .back-image {
      width: 75px;
    }
    .cartIcon {
      font-size: 2.6rem;
      bottom: 14px;
      right: 30px;
    }
    .ant-badge-count {
      height: 1.4rem;
      width: 1.3rem;
      border-radius: 1.4rem;
      font-size: 1rem;
      bottom: 48px;
      right: 24px;
      padding: 0.1em 0;
    }
  }
  
`;

export default Cart;