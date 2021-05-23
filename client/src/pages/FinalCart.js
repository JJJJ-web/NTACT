import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import {
  Steps, Divider, Button, Alert, Form,
} from 'antd';
import {
  LoadingOutlined, MinusOutlined, PlusOutlined, DeleteOutlined, 
} from '@ant-design/icons';
import { LazyImage } from 'react-lazy-images';
import { 
  deleteCart, increment, decrement, deleteAll,
} from '../store/actions';
import Header from './Header';
import Payment from '../Payment';

function FinalCart() {
  const { Step } = Steps;
  const ButtonGroup = Button.Group;
  const dispatch = useDispatch();
  const history = useHistory();
  const cart2 = useSelector((store) => store.cartReducer);

  const list = cart2.cart.map((item) => (
    <div key={item.Id} className="itemDIV" item={item}>
      <Button className="delete" type="default" shape="round" size="small" onClick={() => dispatch(deleteCart(item))}>
        <DeleteOutlined style={{ fontSize: '0.8rem', color: '#959595' }} />
      </Button>

      <LazyImage
        className="listimage"
        src={item.Img}
        alt={item.Name}
        title={item.Name}
        width="20%"
        placeholder={({ imageProps, ref }) => (
          <LoadingOutlined
            style={{ color: 'orange', fontSize: '5rem' }}
            ref={ref}
            alt={imageProps.alt}
          />
        )}
        actual={
          // eslint-disable-next-line react/jsx-props-no-spreading
          ({ imageProps }) => <img {...imageProps} alt="img" />
        }
      />

      <b className="itmePrice">
        {(item.Price * item.Quantity).toLocaleString()}
        원
      </b>
      <span className="itmeName">
        {item.Name}
        <br />
        <div>
          기본:
          &nbsp;
          {item.Price.toLocaleString()}
          원
        </div>
      </span>
      <div className="quantityButton">
        <ButtonGroup>
          <Button onClick={() => dispatch(decrement(item))} min={1}>
            <MinusOutlined />
          </Button>
          <Button>
            {item.Quantity}
          </Button>
          <Button onClick={() => dispatch(increment(item))}>
            <PlusOutlined />
          </Button>
        </ButtonGroup>
      </div>
      <br />
      <br />
      <br />
      <Divider />
    </div>
  ));

  function resetcart() {
    if (list.length > 0) {
      dispatch(deleteAll());
    }
  }

  return (
    <>
      <Header />
      <Steps type="navigation" size="small" current={0} className="site-navigation-steps">
        <Step title="상품 확인" status="process" />
        <Step title="결제" status="wait" />
        <Step title="주문 접수" status="wait" />
      </Steps>

      <Alert
        message="테스트 결제 모드입니다. 당일 23시 이후에 자동 환불 처리되오니 걱정 않고 결제해보시길 바랍니다."
        type="success"
        closable
        style={{ textAlign: 'center', maxWidth: '650px', margin: '0 auto' }}
      />

      <CartList>
        <div className="topButtons">
          <Link to="/menu">
            <Button className="backMenu" style={{ borderColor: '#505050' }}>
              {'<  메뉴 더 담기'}
            </Button>
          </Link>
          <Button shape="round" className="deleteAll" onClick={resetcart} style={{ color: '#959595' }}>
            <DeleteOutlined />
            비우기
          </Button>
        </div>

        <div className="menus">
          {list}
        </div>

        <div className="sumDIV">
          총 주문 금액
          &nbsp;&nbsp;&nbsp;
          <b>
            {cart2.total.toLocaleString()}
            &nbsp;
          </b>
          원
          <br />
        </div>
        
        <Payment sumAmount={cart2.total} cartItems={cart2.cart} />
      </CartList>
    </>
  );
}

const CartList = styled.div`
  with: 90vw;
  text-align: center;
  height: 100vh;

  .menus {
    display: inline-block;
    text-align: left;
    width: 100vw;
    max-width: 700px;
  }

  .itemDIV {
    position: relative;
  }

  .quantityButton {
    position: absolute;
    right: 15%;
    bottom: 15%;
  }

  .quantityButton Button {
    height: 30%;
    font-size: 0.8rem;
  }

  .listimage {
    float: left;
  }

  .itmeName {
    float: left;
    margin-top: 5%;
  }

  .itmeName div {
    color: #bfbfbf;
  }

  .itmePrice {
    float: right;
    padding-right: 15%;
    padding-top: 5%;
  }

  .delete {
    position: absolute;
    right: 5%;
  }

  .sumDIV {
    display: block;
    height: 56px;
    border-bottom: 3px dashed #a1a1a1;
    padding: 20px 0px 50px 0px;
    font-size: 1.1rem;
  }

  .topButtons {
    height: 50px;
    border-bottom: 3px dashed #a1a1a1;
    margin: 15px 0 20px 0;
  }

  .backMenu {
    position: absolute;
    left: 5%;
  }

  .deleteAll {
    position: absolute;
    right: 5%;
  }


  .site-navigation-steps {
    margin-bottom: 2px;
    box-shadow: 0px -1px 0 0 #e8e8e8 inset;
  }
`;
export default FinalCart;