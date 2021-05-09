import React, { useEffect, useState } from 'react';
import { Badge, Tabs } from 'antd';
import axios from 'axios';
import ShopList from './ShopList';

function ShopTabs() {
  const [ready, setRCount] = useState();
  const [progress, setPCount] = useState();
  const [completed, setCCount] = useState();
  const { TabPane } = Tabs;

  function getCount() {
    axios.get('/api/orders/ready').then((res) => {
      setRCount(res.data.length);
    });
    axios.get('/api/orders/in-progress').then((res) => {
      setPCount(res.data.length);
    });
    axios.get('/api/orders/completed').then((res) => {
      setCCount(res.data.length);
    });
  }

  useEffect(() => {
    getCount();
  }, [ready, progress, completed]);

  return (
    <Tabs defaultActiveKey="ready" size="large" onClick={getCount}>
      <TabPane tab={` 접수 ${ready}`} key="ready">
        <ShopList status="ready" />
      </TabPane>
      <TabPane tab={` 조리 중 ${progress}`} key="in-progress">
        <ShopList status="in-progress" />
      </TabPane>
      <TabPane tab={` 완료 ${completed}`} key="completed">
        <ShopList status="completed" />
      </TabPane>
    </Tabs>
  );
}

export default ShopTabs;
