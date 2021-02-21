import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {useSelector} from 'react-redux';
import Payment from '../Payment/index';

function FinalCart() {
    const cart = useSelector((store) => store.cartReducer);
    const sum = useLocation();
    const list = []; 
    const res = []; 
    const arr = Object.create(null); 
    const [finalSum, setfinalSum] = useState(0); 
    const [finalRes, setfinalRes] = useState([]); 

    for(let i = 0; i < cart.length; i++) { 
        const json = Object.create(null);
        json.Id = cart[i].id;
        json.Name = cart[i].name_kor;
        json.Price = cart[i].price;

        list.push(json);
    }

    for(let i = 0; i < list.length; i++) {
        if(!arr[list[i].Id]) {
            res.push(list[i]);
        }
        arr[list[i].Id] = ((arr[list[i].Id] || 0) + 1);
    }

    for (let j = 0; j < res.length; j++) {
        res[j].Quantity = arr[res[j].Id];
    }

    useEffect(() => {
        setfinalSum(sum.state.sum);
        setfinalRes(res);
    }, []);

    console.log(finalRes); 

    return (
        <div>
            <h3>최종 장바구니 화면입니다.</h3>
            <div>총 금 액 : {finalSum}</div>
            <br />
            <hr />
            <div>
                {
                    res.map((item, idx) => {
                        return (
                            <div key={idx}>
                                <div>{item.Name}</div>
                                <div>{item.Price}</div>
                                <div>{item.Quantity}</div>
                                <button>+</button>
                                <button>-</button>
                                <br /><br />
                            </div>
                        );
                    })
                }
                
            </div>
            <Payment sumAmount={finalSum} cartItems={finalRes} />
        </div>
    );
}

export default FinalCart;