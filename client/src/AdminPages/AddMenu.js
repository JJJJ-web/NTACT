import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
  Input, Select, InputNumber, Upload, Form, Button, Space, message, Divider,
} from 'antd';
import { LoadingOutlined, DeleteFilled, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';

const { Option } = Select;
const { TextArea } = Input;

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function AddMenu() {
  const formRef = React.createRef();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [newCategoryNameKor, setNewCategoryNameKor] = useState();
  const [newCategoryNameEng, setNewCategoryNameEng] = useState();
  const [imageUploadStatus, setImageUploadStatus] = useState();
  const [imageLoading, setImageLoading] = useState({
    imageUrl: null,
    imageLoading: false,
  });

  function handleSubmit(res) {
    const data = res.addMenus[0];
    console.log(data);
    const image = data.image[data.image.length - 1].name.split('.');

    /*
    axios.post('/api/menus', {
      fileName: image[0],
      fileType: image[1],
      price: data.price, // 가격
      name_kor: data.nameKor,
      name_eng: data.nameEng,
      description: data.description,
      category_kor: data.selectCategory,
      category_eng: categories.filter((res) => res.name_kor === data.selectCategory),
    })
      .then((res) => {
        if (res.status === 200) {
        }
      });
     */
  }

  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);


  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('JPG 또는 PNG 이미지만 등록 할 수 있습니다.');
    }
    return isJpgOrPng ? true : Upload.LIST_IGNORE;
  }

  function newCategoryKorChange(e) {
    setNewCategoryNameKor(e.target.value);
  }
  function newCategoryEngChange(e) {
    setNewCategoryNameEng(e.target.value);
  }

  function onNewCategory(e) {
    categories.push({
      name_kor: newCategoryNameKor,
      name_eng: newCategoryNameEng,
    });
    form.setFieldsValue({
      카테고리: newCategoryNameKor,
    });
  }

  return (
    <Container>
      <Form
        onFinish={handleSubmit}
        ref={formRef}
        name="addMenuForm"
        layout="vertical"
        autoComplete="off"
      >
        <Form.List name="addMenus">
          {(fields, { add, remove }) => (
            <>
              {fields.map((field) => (
                <Space
                  key={field.key}
                  style={{ display: 'flex', marginBottom: 8 }}
                  align="baseline"
                >
                  <Form.Item
                    label="이미지 업로드"
                    name={[field.name, 'image']}
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    rules={[
                      {
                        required: true,
                        message: '이미지 등록은 필수입니다.',
                      },
                    ]}
                  >
                    <Upload name="logo" listType="picture" maxCount={1} beforeUpload={beforeUpload}>
                      <Button icon={<PlusOutlined />}>이미지 선택</Button>
                    </Upload>
                  </Form.Item>
                  <Form.Item
                    label="가격 (원)"
                    name={[field.name, 'price']}
                    rules={[
                      {
                        type: 'number',
                        required: true,
                        message: '가격은 필수입력입니다.',
                      },
                    ]}
                  >
                    <InputNumber min={1} max={999999} step={100} />
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'selectCategory']}
                    label="카테고리"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: 200 }}
                      optionFilterProp="children"
                      /* eslint-disable-next-line max-len */
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                      dropdownRender={(menu) => (
                        <div>
                          <Form.Item
                            rules={[
                              {
                                required: true,
                                message: '영어, 한국어 필수 입력입니다.',
                              },
                            ]}
                          >
                            <Input style={{ flex: 'auto' }} placeholder="새 카테고리 영어명 입력" onChange={newCategoryEngChange} />
                            <Input style={{ flex: 'auto' }} placeholder="새 카테고리 한국어명 입력" onChange={newCategoryKorChange} />
                          </Form.Item>
                          <div style={{ display: 'flex', flexWrap: 'nowrap', padding: 8 }}>
                            <Button
                              style={{ flex: 'auto' }}
                              onClick={onNewCategory}
                            >
                              새 카테고리 등록
                            </Button>
                          </div>
                          <Divider style={{ margin: '4px 0' }} />
                          {menu}
                        </div>
                      )}
                    >
                      {
                        categories.map((item) => (
                          <Option
                            key={item.name_kor}
                            value={item.name_kor}
                          >
                            {item.name_kor}
                          </Option>
                        ))
                      }
                    </Select>
                  </Form.Item>

                  <Form.Item
                    name={[field.name, 'nameKor']}
                    label="메뉴 이름(한국어)"
                    rules={[
                      {
                        required: true,
                        message: '한국어 메뉴 이름은 필수입력입니다.',
                      },
                    ]}
                  >
                    <Input placeholder="메뉴 이름(한국어)" allowClear maxLength={45} />
                  </Form.Item>
                  <Form.Item
                    name={[field.name, 'nameEng']}
                    label="메뉴 이름(영어)"
                    rules={[
                      {
                        required: false,
                        message: '영어 메뉴 이름은 선택 입력입니다.',
                      },
                    ]}
                  >
                    <Input placeholder="메뉴 이름(영어)" allowClear maxLength={45} />
                  </Form.Item>
                  <Form.Item label="메뉴 상세설명" name={[field.name, 'description']}>
                    <TextArea placeholder="메뉴 상세설명 입력" maxLength={100} />
                  </Form.Item>
                  <DeleteFilled
                    onClick={() => remove(field.name)}
                    style={{ fontSize: '22px', color: '#FF0000' }}
                  />
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  새 메뉴 생성
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>

        <Form.Item>
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

  inputText {
    padding-left: 2rem;
  }
`;
export default AddMenu;