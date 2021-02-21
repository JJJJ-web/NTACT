import React, {useState, useEffect} from 'react';
import axois from 'axios';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';

function Ade() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axois.get('/api/menus')
            .then((res) => setProducts(res.data));
    }, []);

    const ade = products.filter((res) => {
        return res.category_id === 300;
    });

    return (
        <div>
            <Link to = '/milkbeverage'>
                <button>MILK BEVERAGE</button>
            </Link>
            <button>ADE</button>
            <Link to = '/shake'>
                <button>SHAKE</button>
            </Link>
            {
                ade.map((item) => {
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

export default Ade;