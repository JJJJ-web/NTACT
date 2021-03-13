import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {useDispatch} from 'react-redux';
import {addCart} from '../store/actions';
import {LazyImage} from 'react-lazy-images';
import {LoadingOutlined} from '@ant-design/icons';
import {Collapse, Space} from 'antd';
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
                        <Space key={item.id} align="center" direction="vertical" wrap>
                            <Collapse defaultActiveKey='0' expandIconPosition={'right'} className="site-collapse-custom-collapse" key={item.id}>
                                <div className="menuItem" onClick={() => dispatch(addCart(item))}>
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
                                </div>

                                <Panel header='설명보기' className="site-collapse-custom-panel">
                                    <p>{item.description}</p>
                                </Panel>
                            </Collapse>
                        </Space>
                    );
                })
            }
        </MenuListStyle>
    );
}

const MenuListStyle = styled.div`
  display: inline-block;

  .site-collapse-custom-collapse{
    width: 100vw;
  }
  .site-collapse-custom-panel {
    display: inline-block;
    background-color: lightgrey;
  }
  
  .menuItem{
    display: inline;
    width: 100vh;
  }
  .itmePrice{
    position: relative;
    top: 3vh;
  }
  .menuItem div{
    display: inline;
  }
`;
export default MenuList;