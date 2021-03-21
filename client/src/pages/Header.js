import React, {useState} from 'react';
import {Row, Col, Layout, Menu} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';

function Header() {
    const [userName, setUserName] = useState(JSON.parse(sessionStorage.getItem('userInfo')).userName);

    return (
        <Layout>
            <Menu theme="dark" mode="horizontal" theme="light" style={{lineHeight: '30px', textAlign: 'center', backgroundColor: '#FFF8EA'}}>

                <Row>
                    <Col span={6}>
                        <Link to='/menu'>
                            <ReadOutlined /> 메뉴판
                        </Link>
                    </Col>
                    <Col span={12}>
                        {userName}님 반갑습니다.
                    </Col>
                    <Col span={6}>
                        <Link to='/payment/history'>
                            <MenuOutlined /> 결제 내역
                        </Link>
                    </Col>
                </Row>
            </Menu>
        </Layout>

    );
}

export default Header;