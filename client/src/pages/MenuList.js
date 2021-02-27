import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';
import {LazyImage} from 'react-lazy-images';
import {LoadingOutlined} from '@ant-design/icons';

function MenuList(props) {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get('/api/menus').then((res) => setProducts(res.data));
    }, []);

    const list = products.filter((res) => {
        return res.category_id === props.categoryId;
    });

    return (
        <>
            {
                list.map((item) => {
                    return (
                        <div key={item.id} onClick={() => dispatch(addCart(item))}>
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
                        </div>
                    );
                })
            }
        </>
    );
}

export default MenuList;