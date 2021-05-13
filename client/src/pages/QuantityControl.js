import { Button } from 'antd';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement2, increment2 } from '../store/actions';

function QuantityControl({ item }) {
  const dispatch = useDispatch();
  const cartList = useSelector((store) => store.cartReducer);
  const ButtonGroup = Button.Group;
  const [quantity, setQuantity] = useState(item.Quantity);

  function setQuantityButton() {
    for(let i = 0; i < cartList.spareCart.length; i++) {
      if(item.Id === cartList.spareCart[i].Id) {
        setQuantity(cartList.spareCart[i].Quantity);
      }
    }
  }

  useState(() => {
    setQuantityButton();
  }, []);
  
  return (
    <ButtonGroup className="button">
      <Button
        onClick={() => {
          dispatch(decrement2(item));
          setQuantityButton();
        }}
      >
        <MinusOutlined />
      </Button>
      <Button>
        {quantity}
      </Button>
      <Button onClick={() => {
        dispatch(increment2(item));
        setQuantityButton();
      }}
      >
        <PlusOutlined />
      </Button>
    </ButtonGroup>
  );
}

export default QuantityControl;