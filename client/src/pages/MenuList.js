import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { LazyImage } from 'react-lazy-images';
import { 
  LoadingOutlined, ShoppingCartOutlined,
} from '@ant-design/icons';
import {
  Collapse, Space,
} from 'antd';
import QuantityButtons from './QuantityControl';

function MenuList({ products, categoryId }) {
  const { Panel } = Collapse;
  const list2 = [];

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
    json.Quantity = 0;
    json.Status = list[i].sales_stat;
    json.DelayTime = list[i].delay_time;

    list2.push(json);
  }

  return (
    <MenuListStyle>
      {list2.map((item, idx) => (
        <Space key={item.Id} align="center" direction="vertical" wrap>
          <Collapse
            bordered={false}
            className="site-collapse-custom-collapse"
            key={item.Id}
          >
            <Panel
              showArrow={false}
              header={(
                <div role="menu" tabIndex={idx} className="menuItem">
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
              )}
              className="site-collapse-custom-panel"
            >
              <div>
                {item.Description}
                <div>
                  <QuantityButtons item={item} />
                </div>
              </div>
            </Panel>
          </Collapse>
          <br />
        </Space>
      ))}
    </MenuListStyle>
  );
}

const MenuListStyle = styled.div`
  display: inline-block;

  .site-collapse-custom-collapse {
    width: 100vw;
    background-color: white;
    border-bottom: 1px solid #e9e9e9;
  }
  .site-collapse-custom-panel {
    display: inline-block;
    background-color: white;
    border: 0px;
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