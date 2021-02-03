import React, {Component} from 'react';
import Login from './Login';
import KakaoLogin from './KakaoLogin';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>메인 화면</h2>
                <KakaoLogin />
            </div>
        );
    }
}

export default Home;