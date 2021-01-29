import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Header extends Component {
    render() {
        const {logged, onLogout} = this.props;

        return (
            <div>
                {logged ?
                    <Link to="/" onClick={onLogout}>로그아웃</Link> :
                    <Link to="/login">로그인/회원가입</Link>
                }
            </div>
        );
    }
}

export default Header;