import React, { useEffect, useState } from 'react';
import { Badge, Tabs } from 'antd';
import axios from 'axios';
import List from './List';

function ShopTabs() {
  const [ready, setRCount] = useState();
  const [progress, setPCount] = useState();
  const [completed, setCCount] = useState();
  const [data, setData] = useState([]);
  const { TabPane } = Tabs;

  useState(() => {
    axios.get('/api/orders/ready').then((res) => {
      setData(res.data);
      setRCount(res.data.length);
    });
    axios.get('/api/orders/in-progress').then((res) => {
      setData(res.data);
      setPCount(res.data.length);
    });
    axios.get('/api/orders/completed').then((res) => {
      setData(res.data);
      setCCount(res.data.length);
    });
  });

  return (
    <Tabs defaultActiveKey="ready" size="large">
      <TabPane tab={` 접수 ${ready}`} key="ready">
        <List status="ready" />
      </TabPane>
      <TabPane tab={` 조리 중 ${progress}`} key="in-progress">
        <List status="in-progress" />
      </TabPane>
      <TabPane tab={` 완료 ${completed}`} key="completed">
        <List status="completed" />
      </TabPane>
    </Tabs>
  );
}

export default ShopTabs;
