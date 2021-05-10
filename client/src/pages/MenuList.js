/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { LazyImage } from 'react-lazy-images';
import { LoadingOutlined } from '@ant-design/icons';
import { Collapse, Space } from 'antd';
import { addCart } from '../store/actions';
import socket from '../SocketInfo';

function MenuList({ categoryId }) {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const { Panel } = Collapse;
  const list2 = [];

  useState(() => {
    axios.get('/api/menus').then((res) => setProducts(res.data));
    socket.on('E', () => {
      alert('실시간 주문 상태 변경 이벤트 E 수신');
    });
  }, []);

  const list = products.filter((res) => (
    res.category_id === categoryId
  ));

  for (let i = 0; i < list.length; i++) {
    const json = Object.create(null);
    json.Id = list[i].id;
    json.Name = list[i].name_kor;
    json.CategoryId = list[i].category_id;
    json.Img = list[i].img_url;
    json.Price = list[i].price;
    json.Description = list[i].description;
    json.Quantity = 1;
    json.Status = list[i].sales_stat;
    json.DelayTime = list[i].delay_time;

    list2.push(json);
  }

  return (
    <MenuListStyle>
      {list2.map((item, idx) => (
        <Space key={item.Id} align="center" direction="vertical" wrap>
          <Collapse
            defaultActiveKey="0"
            expandIconPosition="right"
            className="site-collapse-custom-collapse"
            key={item.Id}
          >
            <div role="menu" tabIndex={idx} className="menuItem" onClick={() => dispatch(addCart(item))} onKeyDown={() => dispatch(addCart(item))}>
              <LazyImage
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
                  ({ imageProps }) => <img {...imageProps} alt="img" />
                }
              />
              <div className="itmeName">{item.Name}</div>
              <div className="itmePrice">
                {item.Price.toLocaleString()}
                원
              </div>
              <div>
                품절: 
                {item.Status}
                , 지연시간:
                {item.DelayTime}
                {' '}
              </div>
            </div>
            <Panel header="설명보기" className="site-collapse-custom-panel">
              <p>{item.Description}</p>
            </Panel>
          </Collapse>
        </Space>
      ))}
    </MenuListStyle>
  );
}

const MenuListStyle = styled.div`
  display: inline-block;

  .site-collapse-custom-collapse {
    width: 100vw;
  }
  .site-collapse-custom-panel {
    display: inline-block;
    background-color: lightgrey;
  }

  .menuItem {
    display: inline;
    width: 100vh;
  }
  .itmePrice {
    position: relative;
    top: 3vh;
  }
  .menuItem div {
    display: inline;
  }
`;
export default MenuList;
