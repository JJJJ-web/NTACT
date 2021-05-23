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
  const [products, setProducts] = useState([]);
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
    axios.get('/api/menus').then((res) => setProducts(res.data));
    socket.on('E', () => {
      axios.get('/api/menus').then((res) => setProducts(res.data));
    });
  }, []);

  function pageChange(e) {
    if(e.swipeDirection === 'next') {
      if (currentPage >= '800') {
        setCurrentPage(currentPage = '100');
      } else {
        setCurrentPage(currentPage = (Number(currentPage) + 100).toString());
      }
    } else if(e.swipeDirection === 'prev') {
      if (currentPage === '0' || currentPage === '100') {
        setCurrentPage(currentPage = '800');
      } else {
        setCurrentPage(currentPage = (Number(currentPage) - 100).toString());
      }
    }
  }

  function tabChange(e) {
    setCurrentPage(currentPage = e);
  }

  function filterProduct(c) {
    return products.filter((res) => res.category_id === c);
  }

  return (
    <StickyContainer style={{
      marginRight: '10px',
      marginLeft: '10px',
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
          <TabPane tab={item.name_kor} key={item.id} style={{ marginTop: '-12px' }}>
            <Swiper
              onSlideChange={(e) => pageChange(e)}
              loop="true"
              spaceBetween={3000}
              className="mySwiper"
              slidesPerView={1}
              style={{ minHeight: '100vh' }}
            >
              <SwiperSlide virtualIndex={item.id}>
                <MenuList products={filterProduct(item.id)} />
              </SwiperSlide>
            </Swiper>
          </TabPane>
        ))}
      </Tabs>
    </StickyContainer>
  );
}

export default CategoryTabs;
