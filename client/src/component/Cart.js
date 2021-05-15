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

  return (
    <CartStyle>
      <Link to="/finalcart">
        <div className="cartBack">
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
  .cartBack{
    position: fixed;
    bottom: 13px;
    right: 13px;
    z-index: 50;
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
    bottom: 50px;
    right: 34px;
    z-index: 70;
  }
`;

export default Cart;