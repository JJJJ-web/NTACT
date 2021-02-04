import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class Cart extends Component {
    render() {
        return (
            <div>
                <br />
                <hr />

                <h3>장바구니 화면입니다.</h3>
                <div className='cartStyle'>
                    <div>금 액 : </div><br />
                    <Link to='/finalcart'>
                        <div><button>결제하기</button></div>
                    </Link>
                </div>
            </div>
        );
    }
}

export default Cart;