import React, {useState, useEffect} from 'react';
import axois from 'axios';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';
import {LazyImage} from 'react-lazy-images';
import {LoadingOutlined} from '@ant-design/icons';

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
                            <LazyImage src={item.img_url} alt={item.name_kor} title={item.name_kor}
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

export default MilkBeverage;