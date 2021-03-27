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
    const list2 = []; 

    useEffect(() => {
        axios.get('/api/menus').then((res) => setProducts(res.data));
    }, []);

    const list = products.filter((res) => {
        return res.category_id === props.categoryId;
    });

    for(let i = 0; i < list.length; i++) {
        const json = Object.create(null);
        json.Id = list[i].id;
        json.Name = list[i].name_kor;
        json.CategoryId = list[i].category_id;
        json.Img = list[i].img_url;
        json.Price = list[i].price;
        json.Description = list[i].description;
        json.Quantity = 1;

        list2.push(json);
    }
    
    return (
        <MenuListStyle>
            {
                list2.map((item) => {
                    return (
                        <Space key={item.Id} align="center" direction="vertical" wrap>
                            <Collapse defaultActiveKey='0' expandIconPosition={'right'} className="site-collapse-custom-collapse" key={item.Id}>
                                <div className="menuItem" onClick={() => dispatch(addCart(item))}>
                                    <LazyImage src={item.Img} alt={item.Name} title={item.Name} width={'20%'}
                                        placeholder={
                                            ({imageProps, ref}) =>
                                                <LoadingOutlined style={{color: 'orange', fontSize: '5rem'}} ref={ref} alt={imageProps.alt} />
                                        }
                                        actual={
                                            ({imageProps}) =>
                                                <img {...imageProps} />
                                        }
                                    />
                                    <div className="itmeName">{item.Name}</div>
                                    <div className="itmePrice">{item.Price.toLocaleString()}원</div>
                                </div>

                                <Panel header='설명보기' className="site-collapse-custom-panel">
                                    <p>{item.Description}</p>
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