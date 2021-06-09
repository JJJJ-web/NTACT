import { Button } from 'antd';
import {
  MinusOutlined,
  PlusOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addCart } from '../store/actions';

function QuantityControl({ item }) {
  const dispatch = useDispatch();
  const ButtonGroup = Button.Group;
  const [quantity, setQuantity] = useState(1);

  function minusButton() {
    if(quantity > 1) {
      setQuantity(quantity - 1);
    }
  }
  function plusButton() {
    setQuantity(quantity + 1);
  }
  function cartButton() {
    item.Quantity = quantity;
    dispatch(addCart(item));
    setQuantity(1);
  }
  
  return (
    <ButtonGroup className="button">
      <Button
        className="minus"
        onClick={minusButton}
        style={{ height: '30px' }}
      >
        <MinusOutlined />
      </Button>
      <Button style={{ height: '30px' }}>
        {quantity}
      </Button>
      <Button
        className="plus"
        onClick={plusButton}
        style={{ height: '30px' }}
      >
        <PlusOutlined />
      </Button>
      <Button 
        disabled={item.Status === 0} 
        onClick={() => cartButton()}
        type="primary"
        icon={<ShoppingCartOutlined style={{ fontSize: '1.4rem' }} />}
        style={{ marginLeft: '2rem', height: '30px', width: '70px' }}
      />
    </ButtonGroup>
  );
}

export default QuantityControl;