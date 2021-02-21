import React, {useState, useEffect} from 'react';
import axois from 'axios';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';

function Shake() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axois.get('/api/menus')
            .then((res) => setProducts(res.data));
    }, []);

    const shake = products.filter((res) => {
        return res.category_id === 400;
    });

    return (
        <div>
            <Link to = '/ade'>
                <button>ADE</button>
            </Link>
            <button>SHAKE</button>
            <Link to = '/coffee'>
                <button>COFFEE</button>
            </Link>
            {
                shake.map((item) => {
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

export default Shake;