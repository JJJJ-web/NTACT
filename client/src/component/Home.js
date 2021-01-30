import React, {Component} from 'react';
import Login from './Login';

class Home extends Component {
    render() {
        return (
            <div>
                <h2>메인 화면</h2>
                <Login />
            </div>
        );
    }
}

export default Home;