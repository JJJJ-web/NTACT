import React, {useState} from 'react';
import {Row, Col, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';

function Header() {
    const [userName, setUserName] = useState(JSON.parse(sessionStorage.getItem('userInfo')).userName);

    return (
        <Layout>
            <Menu theme="dark" inlineIndent="1" mode="horizontal" theme="light" style={{lineHeight: '30px', textAlign: 'center', backgroundColor: '#FFF8EA'}}>
                <Menu.Item key="1">
                    <Link to='/menu'>
                        <ReadOutlined /> 메뉴판
                    </Link>
                </Menu.Item>

                <Menu.Item key="2" disabled>{userName}</Menu.Item>

                <Menu.Item key="3">
                    <Link to='/payment/history'>
                        <MenuOutlined /> 결제 내역
                    </Link>
                </Menu.Item>
            </Menu>
        </Layout>
    );
}

export default Header;