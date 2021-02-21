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
                console.log(product.menu_kor, product.sales_stat);
                product.sales_stat === 1 ? setProducts(products.sales_stat = 0) : setProducts(products.sales_stat = 1);
            } else {
                window.alert('토글 실패111');
            }
        });
    }
    async function editMenuClickHandler() {
        await axios.put('/api/menus/updateAllStat',
            {
                headers: {
                    menu: JSON.stringify(selectThisMenu),
                },
            }).then((res) => {
            if (res.status === 200) {
                console.log(JSON.stringify(selectThisMenu));
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
    function onChangeKorName(e) {
        setSelectThisMenu(selectThisMenu.menu_kor = e.target.value);
    }
    function onChangeEngName(e) {
        setSelectThisMenu(selectThisMenu.menu_eng = e.target.value);
    }
    function onChanePrice(e) {
        let value = e.target.value;
        value = value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g, '$1');
        setSelectThisMenu(selectThisMenu.price = value);
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
                            console.log('폼', selectThisMenu);
                            console.log('values', Number(values.MenuPrice));
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
                        label="메뉴이름(한글)"
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
                        label="메뉴이름(영어)"
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
                                required: true,
                                message: '가격은 필수입력입니다.',
                            },
                        ]}
                    >
                        <Input
                            placeholder="가격을 입력하세요."
                            maxLength={11} />
                    </Form.Item>
                    <Form.Item
                        name="category"
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
                                        <Option key={item}
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