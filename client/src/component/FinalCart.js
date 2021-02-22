import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import Payment from '../Payment/index';

function FinalCart() {
    const cart = useLocation();
    const [finalSum, setfinalSum] = useState(cart.state.sum);
    const [finalRes, setfinalRes] = useState([]);

    useEffect(() => {
        setfinalSum(finalSum);
        setfinalRes(cart.state.res);
    });

    console.log(finalRes);

    const onIncrease = (idx) => {
        setfinalRes(finalRes[idx]['Quantity'] += 1);
        totalSum(finalRes);
    };

    const onDecrease = (idx) => {
        if(finalRes[idx].Quantity > 0) {
            setfinalRes(
                finalRes[idx]['Quantity'] -= 1,
            );
        } else {
            setfinalRes(
                finalRes[idx]['Quantity'] = 0,
            );
        }
        totalSum(finalRes);
    };

    const totalSum = (cart) => {
        let total = 0;

        Object.keys(cart).map((item) => {
            total += finalRes[item].Price * finalRes[item].Quantity;
        });
        setfinalSum(total);
    };

    const list = Object.keys(finalRes).map((item, idx) => {
        return (
            <div key={idx}>
                <div>{finalRes[item].Name}</div>
                <div>{finalRes[item].Price}</div>
                <div>{finalRes[item].Quantity}</div>
                <button onClick={() => onIncrease(idx)}>+</button>
                <button onClick={() => onDecrease(idx)}>-</button>
                <br /><br />
            </div>
        );
    });
    
    return (
        <div>
            <h3>최종 장바구니 화면입니다.</h3>
            <div>총 금 액 : {finalSum}</div>
            <br />
            <hr />
            <div>{list}</div>
            <Payment sumAmount={finalSum} cartItems={finalRes} />
        </div>
    );
}

export default FinalCart;