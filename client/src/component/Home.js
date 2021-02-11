import React, {Component} from 'react';
import {useHistory} from 'react-router-dom';
import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';
import {Button} from 'antd';

function Home() {
    const history = useHistory();

    function paymentClick() {
        history.push('/payment');
    }

    return (
        <div>
            <h2>메인 화면</h2>
            <KakaoLogin/>
            <GoogleLogin/>
            <Button onClick={paymentClick}>
                결제 테스트
            </Button>
        </div>
    );
}

export default Home;