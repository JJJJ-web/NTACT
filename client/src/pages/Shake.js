import React, {useState, useEffect} from 'react';
import axois from 'axios';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';
import {LazyImage} from 'react-lazy-images';
import {LoadingOutlined} from '@ant-design/icons';

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
                            <LazyImage src={item.img_url} alt={item.name_kor} title={item.name_kor} width={'20%'}
                                placeholder={
                                    ({imageProps, ref}) =>
                                        <LoadingOutlined style={{color: 'orange', fontSize: '5rem'}} ref={ref} alt={imageProps.alt} />
                                }
                                actual={
                                    ({imageProps}) =>
                                        <img {...imageProps} />
                                }
                            />
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