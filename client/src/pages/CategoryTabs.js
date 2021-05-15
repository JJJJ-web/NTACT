/* eslint-disable react/jsx-props-no-spreading */
import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import MenuList from './MenuList';
import 'swiper/swiper.min.css';
import socket from '../SocketInfo';

function CategoryTabs() {
  // eslint-disable-next-line prefer-const
  let [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { TabPane } = Tabs;
  // eslint-disable-next-line prefer-const
  let [currentPage, setCurrentPage] = useState('100');

  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar 
          {...props} 
          className="site-custom-tab-bar"
          style={{ ...style, backgroundColor: 'white' }}
        />
      )}
    </Sticky>
  );

  useEffect(() => {
    axios.get('/api/categories').then((res) => setCategories(res.data));
  }, []);

  useState(() => {
    console.log(products);
    // eslint-disable-next-line no-return-assign
    axios.get('/api/menus').then((res) => setProducts(res.data));
    socket.on('E', () => {
      alert('실시간 주문 상태 변경 이벤트 E 수신');
      axios.get('/api/menus').then((res) => setProducts(res.data));
    });
  }, []);

  function pageChange(e) {
    if(e.swipeDirection === 'next') {
      if (currentPage >= '400') {
        setCurrentPage(currentPage = '100');
      } else {
        setCurrentPage(currentPage = (Number(currentPage) + 100).toString());
      }
    } else if(e.swipeDirection === 'prev') {
      if (currentPage === '0' || currentPage === '100') {
        setCurrentPage(currentPage = '400');
      } else {
        setCurrentPage(currentPage = (Number(currentPage) - 100).toString());
      }
    }
  }

  function tabChange(e) {
    console.log('tabChange', e);
    setCurrentPage(currentPage = e);
  }

  return (
    <StickyContainer style={{
      paddingRight: '10px',
      paddingLeft: '10px',
      backgroundColor: 'white',
    }}
    >
      <Tabs
        defaultActiveKey="100"
        type="card"
        onChange={tabChange}
        activeKey={currentPage}
        size="large"
        centered="true"
        renderTabBar={renderTabBar}
        animated={{ inkBar: false, tabPane: true }}
      >
        {categories.map((item) => (
          <TabPane tab={item.name_kor} key={item.id}>
            <Swiper
              onSlideChange={(e) => pageChange(e)}
              loop="true"
              spaceBetween={30}
              className="mySwiper"
              slidesPerView={1}
            >
              <SwiperSlide virtualIndex={item.id}>
                <MenuList products={products} categoryId={item.id} />
              </SwiperSlide>
            </Swiper>
          </TabPane>
        ))}
      </Tabs>
    </StickyContainer>
  );
}

export default CategoryTabs;
