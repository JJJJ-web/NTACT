import React, { useEffect, useState } from 'react';
import { Badge, Tabs } from 'antd';
import axios from 'axios';
import ShopList from './ShopList';
import socket from '../SocketInfo';

function ShopTabs(props) {
  const [ready, setRCount] = useState();
  const [progress, setPCount] = useState();
  const [completed, setCCount] = useState();
  const [canceled, setCanCount] = useState();
  const { TabPane } = Tabs;

  function getList(item) {
    axios.get(`/api/orders/${item}`).then((res) => {
      if(item === 'ready') {
        setRCount(res.data.length);
      } if(item === 'in-progress') {
        setPCount(res.data.length);
      } if(item === 'completed') {
        setCCount(res.data.length);
      } if(item === 'canceled') {
        setCanCount(res.data.length);
      }
    });
  }

  function getDefaultList() {
    axios.get('/api/orders/ready').then((res) => {
      setRCount(res.data.length);
    });
    axios.get('/api/orders/in-progress').then((res) => {
      setPCount(res.data.length);
    });
    axios.get('/api/orders/completed').then((res) => {
      setCCount(res.data.length);
    });
    axios.get('/api/orders/canceled').then((res) => {
      setCanCount(res.data.length);
    });
  }
  useState(() => {
    getDefaultList();
  }, []);

  return (
    <Tabs type="card" defaultActiveKey="ready" size="large" onTabClick={getList}>
      <TabPane tab={` 접수 ${ready}`} key="ready">
        <ShopList status="ready" setRCount={setRCount} setPCount={setPCount} setCCount={setCCount} setCanCount={setCanCount} />
      </TabPane>
      <TabPane tab={` 조리 중 ${progress}`} key="in-progress">
        <ShopList status="in-progress" setRCount={setRCount} setPCount={setPCount} setCCount={setCCount} setCanCount={setCanCount} />
      </TabPane>
      <TabPane tab={` 완료 ${completed}`} key="completed">
        <ShopList status="completed" setRCount={setRCount} setPCount={setPCount} setCCount={setCCount} setCanCount={setCanCount} />
      </TabPane>
      <TabPane tab={` 취소 ${canceled}`} key="canceled">
        <ShopList status="canceled" setRCount={setRCount} setPCount={setPCount} setCCount={setCCount} setCanCount={setCanCount} />
      </TabPane>
    </Tabs>
  );
}

export default ShopTabs;
