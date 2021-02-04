import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class FinalCart extends Component {
    render() {
        return (
            <div>
                <h3>최종 장바구니 화면입니다.</h3>
                <div>금 액 : </div>
                <div><button>결제하기</button></div>
            </div>
        );
    }
}

export default FinalCart;