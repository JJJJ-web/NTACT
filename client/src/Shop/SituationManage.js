import React, {useState} from 'react';
import axios from 'axios';
import {Modal, Button, Form, Switch, Col, Row, Select} from 'antd';
import axois from 'axios';

const {Option} = Select;

function SituationManage() {
    const [visible, setVisible] = useState(false);
    const [products, setProducts] = useState([]);

    const onCreate = (values) => {
        console.log('수정 Received values of form: ', values);
        setVisible(false);
    };

    async function soldoutMenuClickHandler(product) {
        await axios.put('/api/menus/status',
            {
                headers: {
                    menu: selectThisMenu,
                },
            }).then((res) => {
            if (res.status === 200) {
                // window.alert('폼 전송 성공111');
                console.log(JSON.stringify(selectThisMenu));
            } else {
                // window.alert('폼 전송 실패111');
            }
        });
    }

    function getMenuSituation() {
        axois.get('/api/menus?category=true').then((res) => setProducts(res.data));
    }

    function CollectionCreateForm({visible, onCreate, onCancel}) {
        const [form] = Form.useForm();
        return (
            <Modal
                visible={visible}
                title="메뉴 관리"
                okText="적용"
                cancelText="취소"
                onCancel={onCancel}
                onOk={() => {
                    form.validateFields()
                        .then((values) => {
                            form.resetFields();
                            onCreate(values);
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

                    {
                        products.map((product, index) => {
                            return (
                                <Row key={index} justify="space-around" gutter={[10, 20]}>
                                    <Col span={4}>
                                        <span>{product.category_kor}</span>
                                    </Col>
                                    <Col span={10}>
                                        <span>{product.menu_kor}</span>
                                    </Col>
                                    <Col span={4}>
                                        <Switch checkedChildren="판매중" unCheckedChildren="품절" style={{width: '4.5rem'}} onClick={() => soldoutMenuClickHandler(product)} checked={product.sales_stat==true?true:false}/>
                                    </Col>
                                    <Col span={6}>
                                        <Select value={product.delay_time==0?'정상 판매':product.delay_time+'분 지연'} style={{width: 120}}>
                                            <Option value="0">정상 판매</Option>
                                            <Option value="10">10분 지연</Option>
                                            <Option value="20">20분 지연</Option>
                                            <Option value="30">30분 지연</Option>
                                            <Option value="40">40분 지연</Option>
                                        </Select>
                                    </Col>
                                </Row>
                            );
                        })
                    }
                </Form>
            </Modal>
        );
    };


    return(
        <>
            <Button
                type="primary"
                onClick={() => {
                    getMenuSituation();
                    setVisible(true);
                }}
            >
                메뉴 상황 실시간 관리
            </Button>
            <CollectionCreateForm
                visible={visible}
                onCreate={onCreate}
                onCancel={() => {
                    setVisible(false);
                }}
            />
        </>
    );
}

export default SituationManage;