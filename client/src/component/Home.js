import React, {Component} from 'react';
import KakaoLogin from './KakaoLogin';
import GoogleLogin from './GoogleLogin';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>메인 화면</h2>
                <KakaoLogin />
                <GoogleLogin />
            </div>
        );
    }
}

export default Home;