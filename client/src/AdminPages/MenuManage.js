import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import axois from 'axios';
import {
    Switch,
    Row,
    Col,
    Divider,
    Button,
    Modal,
    Form,
    Input,
    Radio,
    Select, Space,
} from 'antd';
import AddMenu from './AddMenu';
import {DeleteFilled, FormOutlined} from '@ant-design/icons';
import axios from 'axios';

const {Option} = Select;

function MenuManage() {
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    const [selectThisMenu, setSelectThisMenu] = useState([]);
    const onCreate = (values) => {
        console.log('수정 Received values of form: ', values);
        setVisible(false);
    };

    useState(() => {
        // axois한번으로 메뉴+카테고리명 데이터 받아오기
        axois.get('/api/menus/all?category=true').then((res) => setProducts(res.data));
    }, []);

    function getCategory() {
        const list=[];
        products.map((item) => {
            list.push(item.category_kor);
        });
        const c = list.filter((item, index)=> list.indexOf(item)===index);
        return c;
    }

    async function statClickHandler(product) {
        await axios.patch('/api/menus/updateST',
            {
                headers: {
                    id: product.id,
                },
            }).then((res) => {
            if (res.status === 200) {
                window.alert('토글 성공111');
                product.sales_stat === 1 ? setProducts(product.sales_stat = 0) : setProducts(product.sales_stat = 1);
            } else {
                window.alert('토글 실패111');
            }
        });
    }

    function getThisMenu(menu) {
        setSelectThisMenu(menu);
    }

    function onChangeCategory(e) {
        selectThisMenu.category_kor=e;
        console.log(selectThisMenu);
    }

    function CollectionCreateForm({menu, visible, onCreate, onCancel}) {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title={menu.name_kor}
                okText="수정 완료"
                cancelText="취소"
                onCancel={onCancel}
                onOk={() => {
                    form
                        .validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
                        })
                        .catch((info) => {
                            console.log('Validate Failed:', info);
                        });
                }}
            >
                <Form
                    form={form}
                    layout="vertical"
                    name="form_in_modal"
                    initialValues={{
                        modifier: 'public',
                    }}
                >
                    <Form.Item
                        name="category"
                        label="카테고리"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{width: 200}}
                            defaultValue={selectThisMenu.category_kor}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            onChange={onChangeCategory}
                        >
                            {
                                getCategory().map((item) => {
                                    return(
                                        <Option
                                            value={item}
                                        >{item}</Option>
                                    );
                                })
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.category !== currentValues.category}
                    >
                        {({getFieldValue}) => {
                            return getFieldValue('category') === '카테고리 추가' ? (
                                <Form.Item
                                    name="카테고리 새로 추가"
                                    label="카테고리 새로 추가"
                                    rules={[
                                        {
                                            required: true,
                                        },
                                    ]}
                                >
                                    <Input maxLength={25}/>
                                </Form.Item>
                            ) : null;
                        }}
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input type="textarea" />
                    </Form.Item>
                    <Form.Item name="modifier" className="collection-create-form_last-form-item">
                        <Radio.Group>
                            <Radio value="public">Public</Radio>
                            <Radio value="private">Private</Radio>
                        </Radio.Group>
                    </Form.Item>
                </Form>
            </Modal>
        );
    }

    return (
        <>
            <div className='allMenus'>
                <div>　　　　카테고리 |　　　한국어　　　|　　　영어　　　|　판매가능상태　|　가격　|</div>
                {
                    products.map((product) => {
                        return (
                            <Row key={product.id} justify="start" gutter={[10, 20]}>
                                <Col className="gutter-row" span={2}><img src={product.img_url} width='50vw'/></Col>
                                <Col className="gutter-row" span={1}>{product.category_kor}</Col>
                                <Col className="gutter-row" span={4}>{product.menu_kor}</Col>
                                <Col className="gutter-row" span={4}>{product.menu_eng}</Col>
                                <Col className="gutter-row" span={2}><Switch checkedChildren="판매중" unCheckedChildren="숨기기" onChange={() => statClickHandler(product)} checked={product.sales_stat==true?true:false}/></Col>
                                <Col className="gutter-row" span={3}>{product.price.toLocaleString()}원</Col>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setVisible(true);
                                        getThisMenu(product);
                                    }}
                                >
                                    <FormOutlined style={{fontSize: '18px', color: '#fff'}}/>
                                    수정
                                </Button>
                                <CollectionCreateForm
                                    menu={product}
                                    visible={visible}
                                    onCreate={onCreate}
                                    onCancel={() => {
                                        setVisible(false);
                                    }}
                                />
                            </Row>
                        );
                    })
                }
            </div>
            <br/><hr/>
            <AddMenu />
        </>
    );
}

export default MenuManage;