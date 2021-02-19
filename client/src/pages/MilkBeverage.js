import React, {useState, useEffect} from 'react';
import axois from 'axios';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';

function MilkBeverage() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axois.get('/api/menus')
            .then((res) => setProducts(res.data));
    }, []);

    const milk = products.filter((res) => {
        return res.category_id === 200;
    });

    return (
        <div>
            <Link to = '/coffee'>
                <button>COFFEE</button>
            </Link>
            <button>MILK BEVERAGE</button>
            <Link to = '/ade'>
                <button>ADE</button>
            </Link>
            {
                milk.map((item) => {
                    return (
                        <div key={item.id}>
                            <img src={item.img_url} />
                            <div>{item.name_kor}</div>
                            <div>{item.price.toLocaleString()}원</div>
                            <button onClick={() => dispatch(addCart(item))}>장바구니 담기</button>
                        </div>
                    );
                })
            }
            <Cart />
        </div>
    );
}

export default MilkBeverage;