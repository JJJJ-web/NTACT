import React, { useState } from 'react';
import {
  Nav, NavItem, NavLink, TabContent, TabPane,
} from 'reactstrap';
import axios from 'axios';
import classnames from 'classnames';
import ReceiptList from './ReceiptList';

function ReceiptTabs() {
  const [ready, setRCount] = useState();
  const [progress, setPCount] = useState();
  const [completed, setCCount] = useState();
  const [activeTab, setActiveTab] = useState('0');

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  useState(() => {
    axios.get('/api/orders/ready').then((res) => {
      setRCount(res.data.length);
    });
    axios.get('/api/orders/in-progress').then((res) => {
      setPCount(res.data.length);
    });
    axios.get('/api/orders/completed').then((res) => {
      setCCount(res.data.length);
    });
  });

  return (
    <div className="tabs tabs--justify tabs--bordered-top">
      <div className="tabs__wrap">
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '0' })}
              onClick={() => toggle('0')}
            >
              {` 접수 ${ready}`}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '1' })}
              onClick={() => toggle('1')}
            >
              {` 조리 중 ${progress}`}
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: activeTab === '2' })}
              onClick={() => toggle('2')}
            >
              {` 완료 ${completed}`}
            </NavLink>
          </NavItem>
        </Nav>

        <TabContent activeTab={activeTab}>
          <TabPane tabId="0">
            <ReceiptList status="ready" setRCount={setRCount} setPCount={setPCount} setCCount={setCCount} />
          </TabPane>
          <TabPane tabId="1">
            <ReceiptList status="in-progress" setRCount={setRCount} setPCount={setPCount} setCCount={setCCount} />
          </TabPane>
          <TabPane tabId="2">
            <ReceiptList status="completed" setRCount={setRCount} setPCount={setPCount} setCCount={setCCount} />
          </TabPane>
        </TabContent>
      </div>
    </div>
  );
}

export default ReceiptTabs;
