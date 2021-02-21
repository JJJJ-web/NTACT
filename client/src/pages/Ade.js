import React, {useState, useEffect} from 'react';
import axois from 'axios';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';
import {LazyImage} from 'react-lazy-images';
import {LoadingOutlined} from '@ant-design/icons';

function Ade() {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axois.get('/api/menus').then((res) => setProducts(res.data));
    }, []);

    const ade = products.filter((res) => {
        return res.category_id === 300;
    });

    return (
        <>
            <Link to='/milkbeverage'>
                <button>MILK BEVERAGE</button>
            </Link>
            <button>ADE</button>
            <Link to='/shake'>
                <button>SHAKE</button>
            </Link>
            {
                ade.map((item) => {
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
            <Cart/>
        </>
    );
}

export default Ade;