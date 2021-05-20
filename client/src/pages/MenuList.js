import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LazyImage } from 'react-lazy-images';
import { 
  LoadingOutlined, ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Collapse, Typography,
} from 'antd';
import QuantityButtons from './QuantityControl';

const { Text } = Typography;
function MenuList({ products }) {
  const { Panel } = Collapse;
  const list2 = [];

  for (let i = 0; i < products.length; i++) {
    const json = Object.create(null);
    json.Id = products[i].id;
    json.Name = products[i].name_kor;
    json.CategoryId = products[i].category_id;
    json.Img = products[i].img_url;
    json.Price = products[i].price;
    json.Description = products[i].description;
    json.Quantity = 0;
    json.Status = products[i].sales_stat;
    json.DelayTime = products[i].delay_time;

    list2.push(json);
  }

  function delayTime(time) {
    if(time === 0) return null;
    return `● 주문이 많아 ${time}분 지연 예상됩니다.`;
  }
  function delayTimeColor(time) {
    if(time <= 10) {
      return 'success';
    } if(time <= 30) {
      return 'warning';
    } if(time <= 60) {
      return 'danger';
    }
    return '';
  }

  return (
    <MenuListStyle>
      {list2.map((item, idx) => (
        <>
          <Collapse
            bordered={false}
            className="site-collapse-custom-collapse"
            key={item.Id}
          >
            <Panel
              showArrow={false}
              className="site-collapse-custom-panel"
              header={(
                <div role="menu" tabIndex={idx} className="menuItem">
                  <img className="soldout" width={item.Status ? '0' : '20%'} src="/soldout.png" alt="logo" />

                  <Text className="delayTime" type={delayTimeColor(item.DelayTime)}>
                    {delayTime(item.DelayTime)}
                  </Text>

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
                      // eslint-disable-next-line react/jsx-props-no-spreading
                      ({ imageProps }) => <img {...imageProps} alt="img" />
                    }
                  />

                  <div className="itmeName">
                    {item.Name}
                  </div>
                  <b className="itmePrice">
                    {item.Price.toLocaleString()}
                    원
                  </b>
                </div>
              )}
            >
              <div className="description">
                {item.Description}
              </div>
              <QuantityButtons item={item} />
            </Panel>
          </Collapse>
        </>
      ))}
    </MenuListStyle>
  );
}

const MenuListStyle = styled.div`
  display: inline-block;
  width: 100vw;

  .site-collapse-custom-collapse {
    width: 100vw;
    background-color: white;
    border-bottom: 1px solid #e9e9e9;
  }

  .site-collapse-custom-panel {
    width: 100vw;
    max-width: 600px;
    display: inline-block;
    background-color: white;
    border: 0px;
  }
  
  .soldout {
    position: absolute;
    top: 15%;
    left: 1%;
  }

  .delayTime {
    position: absolute;
    left: 18%;
    font-size: 0.9em;
  }

  .menuItem {
    display: inline;
    width: 100vw;
  }

  .itmeName {
    position: absolute;
    top: 40%;
    left: 22%;
  }

  .itmePrice {
    position: absolute;
    top: 40%;
    right: 10%;
  }

  .menuItem div {
    display: inline;
  }

  .description {
    color: #9a9a9a;
    margin-bottom: 20px;
  }
`;
export default MenuList;