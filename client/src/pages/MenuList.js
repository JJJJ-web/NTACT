import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';
import {LazyImage} from 'react-lazy-images';
import {LoadingOutlined} from '@ant-design/icons';
import {Collapse} from 'antd';
import styled from 'styled-components';

function MenuList(props) {
    const [products, setProducts] = useState([]);
    const dispatch = useDispatch();
    const {Panel} = Collapse;

    useEffect(() => {
        axios.get('/api/menus').then((res) => setProducts(res.data));
    }, []);

    const list = products.filter((res) => {
        return res.category_id === props.categoryId;
    });

    return (
        <MenuListStyle>
            {
                list.map((item) => {
                    return (
                        <Collapse defaultActiveKey='0' expandIconPosition={'right'} className="site-collapse-custom-collapse" key={item.id}>
                            <span className="menuItem" onClick={() => dispatch(addCart(item))}>
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
                                <div className="itmeName">{item.name_kor}</div>
                                <div className="itmePrice">{item.price.toLocaleString()}원</div>
                            </span>

                            <Panel header='설명' className="site-collapse-custom-panel">
                                <p>{item.description}</p>
                            </Panel>
                        </Collapse>
                    );
                })
            }
        </MenuListStyle>
    );
}

const MenuListStyle = styled.div`
  display: inline;
  margin: 0;
  
  .site-collapse-custom-panel {
    display: inline-block;
    float: right;
    background-color: red;
  }
  .itmeName{
    margin-right: 0.2rem;
  }
  .menuItem div{
    display: inline-block;
  }
`;
export default MenuList;