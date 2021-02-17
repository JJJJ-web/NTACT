import React, {useState, useEffect} from 'react';
import 'antd/dist/antd.css';
import axois from 'axios';
import {Input, Select, Row, Col, InputNumber, Upload, Form, Button, Space} from 'antd';
import {InboxOutlined, DeleteFilled, PlusOutlined} from '@ant-design/icons';
import styled from 'styled-components';

const {Option} = Select;
const {TextArea} = Input;
const tailLayout = {
    wrapperCol: {
        offset: 8,
        span: 16,
    },
};
const normFile = (e) => {
    console.log('Upload event:', e);

    if (Array.isArray(e)) {
        return e;
    }

    return e && e.fileList;
};

function AddMenu() {
    const formRef = React.createRef();
    function handleSubmit() {

    }
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
    return(
        <Container>
            <Form onFinish={handleSubmit} ref={formRef} name="addMenuForm" layout="vertical" autoComplete="off">
                <Form.List name="addMenus">
                    {(fields, {add, remove}) => (
                        <>
                            {fields.map((field) => (
                                <Space key={field.key} style={{display: 'flex', marginBottom: 8}} align="baseline">
                                    <Form.Item label="이미지" >
                                        <Form.Item name="image" valuePropName="fileList" getValueFromEvent={normFile} noStyle rules={[
                                            {
                                                required: true,
                                                message: '이미지 등록은 필수입니다.',
                                            },
                                        ]}>
                                            <Upload.Dragger name="files" action="/upload.do">
                                                <p className="ant-upload-drag-icon">
                                                    <InboxOutlined />
                                                </p>
                                                <p className="ant-upload-text">이곳에 이미지 파일을 드래그하거나 클릭하세요.</p>
                                                <p className="ant-upload-hint">이미지 등록은 필수입니다.</p>
                                            </Upload.Dragger>
                                        </Form.Item>
                                    </Form.Item>
                                    <Form.Item label="가격">
                                        <Form.Item name="inputAmount" noStyle rules={[
                                            {
                                                required: true,
                                                message: '가격은 필수입력입니다.',
                                            },
                                        ]}>
                                            <InputNumber min={1} max={999999} /> 원
                                        </Form.Item>
                                    </Form.Item>

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
                                            placeholder="카테고리를 선택하세요"
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
                                    <Form.Item name="nameKor" label="메뉴 이름(한국어)" rules={[
                                        {
                                            required: true,
                                            message: '한국어 메뉴 이름은 필수입력입니다.',
                                        },
                                    ]}>
                                        <Input placeholder="메뉴 이름(한국어)" allowClear maxLength={45}/>
                                    </Form.Item>
                                    <Form.Item name="nameEng" label="메뉴 이름(영어)" rules={[
                                        {
                                            required: false,
                                            message: '영어 메뉴 이름은 선택 입력입니다.',
                                        },
                                    ]}>
                                        <Input placeholder="메뉴 이름(영어)" allowClear maxLength={45}/>
                                    </Form.Item>
                                    <Form.Item label="메뉴 상세설명">
                                        <TextArea placeholder="메뉴 상세설명 입력" maxLength={100} />
                                    </Form.Item>
                                    <DeleteFilled onClick={() => remove(field.name)} style={{fontSize: '22px', color: '#FF0000'}}/>
                                </Space>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    새 메뉴 생성
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>

                <Form.Item {...tailLayout}>
                    <Button type="primary" htmlType="submit">
                        메뉴 등록
                    </Button>
                </Form.Item>
            </Form>
        </Container>
    );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #fff;
  border-radius: 4px;
  top: 2rem;
  left: 2rem;
  right: 2rem;
  bottom: 2rem;
  padding: 2rem;

  inputText{
    padding-left: 2rem;
  }
`;
export default AddMenu;