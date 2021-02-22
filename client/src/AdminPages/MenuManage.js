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
    Select, Space, InputNumber,
} from 'antd';
import AddMenu from './AddMenu';
import {DeleteFilled, FormOutlined} from '@ant-design/icons';
import axios from 'axios';
import {number} from 'prop-types';

const {Option} = Select;

function MenuManage() {
    const [products, setProducts] = useState([]);
    const [visible, setVisible] = useState(false);
    let [selectThisMenu, setSelectThisMenu] = useState([]);
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
        getThisMenu(product);
        await axios.patch('/api/menus/updateST',
            {
                headers: {
                    id: product.id,
                },
            }).then((res) => {
            if (res.status === 200) {
                product.sales_stat === 1 ? setSelectThisMenu(selectThisMenu.sales_stat = 0) : setSelectThisMenu(selectThisMenu.sales_stat = 1);
                console.log(selectThisMenu.menu_kor, selectThisMenu.sales_stat);
            } else {
                window.alert('토글 실패111');
            }
        });
    }
    async function editMenuClickHandler() {
        await axios.put('/api/menus/updateAllStat',
            {
                headers: {
                    menu: selectThisMenu,
                },
            }).then((res) => {
            if (res.status === 200) {
                window.alert('폼 전송 성공111');
                console.log(JSON.stringify(selectThisMenu));
            } else {
                window.alert('폼 전송 실패111');
            }
        });
    }

    function getThisMenu(menu) {
        setSelectThisMenu(selectThisMenu = menu);
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
                            setSelectThisMenu(selectThisMenu.menu_kor=values.MenuNameKorean);
                            setSelectThisMenu(selectThisMenu.menu_eng=values.MenuNameEnglish);
                            setSelectThisMenu(selectThisMenu.price=Number(values.MenuPrice));

                            form.resetFields();
                            editMenuClickHandler();
                            onCancel();
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
                        name="MenuNameKorean"
                        label="메뉴이름 (한글)"
                        initialValue={selectThisMenu.menu_kor}
                        rules={[
                            {
                                required: true,
                                message: '메뉴이름은 필수입력입니다.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="MenuNameEnglish"
                        label="메뉴이름 (영어)"
                        initialValue={selectThisMenu.menu_eng}
                        rules={[
                            {
                                required: true,
                                message: '메뉴이름은 필수입력입니다.',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="MenuPrice"
                        label="가격"
                        initialValue={selectThisMenu.price}
                        rules={[
                            {
                                type: 'number',
                                required: true,
                                message: '숫자를 입력하세요.',
                            },
                        ]}
                    >
                        <InputNumber
                            placeholder={selectThisMenu.price}
                            maxLength={7}
                            style={{width: '7rem'}}
                            step={100}
                        />
                    </Form.Item>
                    <Form.Item
                        name="MenuCategory"
                        label="카테고리"
                        initialValue={selectThisMenu.category_kor}
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{width: 200}}
                            value={selectThisMenu.category_kor}
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {
                                getCategory().map((item) => {
                                    return(
                                        <Option key={item}
                                            value={item}
                                        >{item}</Option>
                                    );
                                })
                            }
                            <Option value='카테고리 추가'>...카테고리 추가</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        noStyle
                        shouldUpdate={(prevValues, currentValues) => prevValues.MenuCategory !== currentValues.MenuCategory}
                    >
                        {({getFieldValue}) => {
                            return getFieldValue('MenuCategory') === '카테고리 추가' ? (
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
                </Form>
            </Modal>
        );
    }

    return (
        <>
            <div className='allMenus'>
                <Row key='listTable' justify="space-around" gutter={[10, 20]}>
                    <Col className="gutter-row" span={2}>이미지</Col>
                    <Col className="gutter-row" span={2}>카테고리</Col>
                    <Col className="gutter-row" span={4}>한국어</Col>
                    <Col className="gutter-row" span={4}>영어</Col>
                    <Col className="gutter-row" span={3}>판매가능상태</Col>
                    <Col className="gutter-row" span={5}>가격</Col>
                </Row>
                <hr />
                {
                    products.map((product) => {
                        return (
                            <Row key={product.id} justify="space-around" gutter={[10, 20]}>
                                <Col className="gutter-row" span={2}><img src={product.img_url} width='50vw'/></Col>
                                <Col className="gutter-row" span={1}>{product.category_kor}</Col>
                                <Col className="gutter-row" span={4}>{product.menu_kor}</Col>
                                <Col className="gutter-row" span={4}>{product.menu_eng}</Col>
                                <Col className="gutter-row" span={2}><Switch checkedChildren="판매중" unCheckedChildren="숨기기" onClick={() => statClickHandler(product)} checked={product.sales_stat==true?true:false}/></Col>
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