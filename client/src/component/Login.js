import React from 'react';
import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';

function Home() {
    return (
        <div>
            <KakaoLogin/>
            <GoogleLogin/>
        </div>
    );
}

export default Home;