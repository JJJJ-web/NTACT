import React, {useState} from 'react';
import {Row, Col} from 'antd';
import {Link} from 'react-router-dom';
import styled from 'styled-components';
import {MenuOutlined, ReadOutlined} from '@ant-design/icons';

function Header() {
    const [userName, setUserName] = useState(JSON.parse(sessionStorage.getItem('userInfo')).userName);

    return (
        <Row>
            <Col span={6}>
                <ReadOutlined />메뉴
            </Col>
            <Col span={9}>
                {userName}님 반갑습니다.
            </Col>
            <Col span={9}>
                <MenuOutlined />결제 내역
            </Col>
        </Row>
    );
}

export default Header;