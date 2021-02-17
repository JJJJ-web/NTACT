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

function MenuManage() {
    const [products, setProducts] = useState([]);
    // const [menu, setMenu] = useState([]);
    let [stat, setStat] = useState(true);
    const [visible, setVisible] = useState(false);
    const onCreate = (values) => {
        console.log('수정 Received values of form: ', values);
        setVisible(false);
    };

    function onCategoryChange(value) {
        console.log(`selected ${value}`);
        switch (value) {
        case 'Ade':
            formRef.current.setFieldsValue({
                note: 'Ade',
            });
            return;
        case 'Coffee':
            formRef.current.setFieldsValue({
                note: 'Coffee',
            });
            return;
        case 'MilkBeverage':
            formRef.current.setFieldsValue({
                note: 'MilkBeverage',
            });
            return;
        case 'Shake':
            formRef.current.setFieldsValue({
                note: 'Shake',
            });
            return;
        case '카테고리 추가':
            formRef.current.setFieldsValue({
                note: '카테고리 추가',
            });
            return;
        }
    };

    useState(() => {
        axois.get('/api/menus').then((res) => setProducts(res.data));
    }, []);

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
                            defaultValue={menu.category_id}
                            optionFilterProp="children"
                            onChange={onCategoryChange}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option value="Ade">Ade</Option>
                            <Option value="Coffee">Coffee</Option>
                            <Option value="MilkBeverage">MilkBeverage</Option>
                            <Option value="Shake">Shake</Option>
                            <Option value="카테고리 추가">...카테고리 추가</Option>
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
    function statClickHandler(product) {
        stat = product;
        stat.sales_stat === 1 ? setStat(stat.sales_stat = 0) : setStat(
            stat.sales_stat = 1);
        console.log(stat.name_kor, stat.sales_stat);
    }

    return (
        <>
            <div className='allMenus'>
                <div>　　　　카테고리 |　　　한국어　　　|　　　영어　　　|　판매가능상태　|　가격　|</div>
                {
                    products.map((product) => {
                        return (
                            <Row key={product.id} justify="start" gutter={{xs: 16, sm: 16, md: 16, lg: 16}}>
                                <Col className="gutter-row" span={2}><img src={product.img_url} width='50vw'/></Col>
                                <Col className="gutter-row" span={1}>{product.category_id}</Col>
                                <Col className="gutter-row" span={4}>{product.name_kor}</Col>
                                <Col className="gutter-row" span={4}>{product.name_eng}</Col>
                                <Col className="gutter-row" span={2}><Switch checkedChildren="판매중" unCheckedChildren="숨기기" onChange={() => statClickHandler(product)} checked={product.sales_stat==true?true:false}/></Col>
                                <Col className="gutter-row" span={3}>{product.price.toLocaleString()}원</Col>
                                <Button
                                    type="primary"
                                    onClick={() => {
                                        setVisible(true);
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