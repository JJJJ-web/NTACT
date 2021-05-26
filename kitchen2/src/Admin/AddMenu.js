import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
  Input, Select, InputNumber, Upload, Form, Button, Space, message, Divider,
} from 'antd';
import { LoadingOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';
import AddCategory from './AddCategory';

const { Option } = Select;
const { TextArea } = Input;
const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

function AddMenu() {
  const formRef = React.createRef();
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  let addCount = 0;
  let addSuccess = false;
  console.log(formRef, form);

  function handleSubmit(formdata) {
    console.log(formdata);
    const form = formdata.addMenus[0];
    const imageObj = form.image[form.image.length - 1].originFileObj;
    const image = form.image[form.image.length - 1].name.split('.');

    axios.post('/api/menus', {
      fileName: image[0],
      fileType: image[1],
      price: form.price, // 가격
      name_kor: form.nameKor,
      name_eng: form.nameEng,
      description: form.description,
      category_kor: form.selectCategory,
      category_eng: categories.filter((res) => res.name_kor === form.selectCategory)[0].name_eng,
    })
      .then((res) => {
        if (res.status === 201) {
          const { data } = res.data;
          const options = {
            headers: {
              'Content-Type': image[1],
            },
          };
          axios.put(data.signedRequest, imageObj, options)
            .then((result) => {
              message.success(`${form.selectCategory}에 ${form.nameKor} 메뉴 등록을 완료했습니다.`, 10);
              setTimeout(() => window.location.replace('/admin'), 5000);
              addSuccess = true;
            })
            .catch((error) => {
              console.log('Response from s3', error);
            });
        } else if (res.status === 500) {
          message.error('이미지 등록에 실패하였습니다. 다시 시도해주세요.', 10);
        } else if (res.status === 422) {
          message.error('메뉴 등록에 실패하였습니다. 다시 시도해주세요.', 10);
        }
      })
      .catch((err) => {
        message.error('메뉴 등록에 실패하였습니다. 다시 시도해주세요.', 10);
      });
  }

  useEffect(() => {
    axios.get('/api/categories').then((res) => {
      setCategories(res.data);
    });
  }, []);


  function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('JPG 또는 PNG 이미지만 등록 할 수 있습니다.', 10);
    }
    return isJpgOrPng ? true : Upload.LIST_IGNORE;
  }

  return (
    <Container>
      <AddCategory />
      <Form
        onFinish={handleSubmit}
        ref={formRef}
        name="addMenuForm"
        autoComplete="off"
        layout="vertical"
      >
        <Form.List name="addMenus">
          {(fields, { add, remove }) => (
            <>
              <Form.Item className="addBtn">
                <Button
                  onClick={() => {
                    if(addCount === 0) {
                      add();
                    }
                    ++addCount;
                  }}
                  block
                  icon={<PlusOutlined />}
                  // style={{ visibility: addCount ? 'hidden' : 'visible' }}
                >
                  새 메뉴 생성
                </Button>
              </Form.Item>
              {fields.map((field) => (
                <div className="addFields" key="add1">
                  <div className="addTop">
                    <Button
                      className="addDeleteBtn"
                      onClick={() => {
                        remove(field.name);
                        addCount = 0;
                      }}
                    >
                      취소
                    </Button>
                    <b>
                      메뉴 생성
                    </b>
                    <Button
                      className="addSubmitBtn"
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        if(addSuccess) {
                          setTimeout(() => remove(field.name), 500);
                          addCount = 0;
                        }
                      }}
                    >
                      등록
                    </Button>
                  </div>

                  <Form.Item
                    name={[field.name, 'selectCategory']}
                    label="카테고리"
                    rules={[
                      {
                        required: true,
                        message: '카테고리는 필수입력입니다.',
                      },
                    ]}
                  >
                    <Select
                      showSearch
                      style={{ width: '200px' }}
                      optionFilterProp="children"
                      /* eslint-disable-next-line max-len */
                      filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
                    <InputNumber min={1} max={999999} step={100} style={{ width: '200px' }} />
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
                      <Button type="dashed" danger icon={<PlusOutlined />} style={{ width: '36vw', maxWidth: '400px' }}>이미지 선택</Button>
                    </Upload>
                  </Form.Item>

                  <Form.Item label="메뉴 상세설명" name={[field.name, 'description']}>
                    <TextArea placeholder="메뉴 상세설명 입력" maxLength={100} />
                  </Form.Item>

                  <div className="addBottom" />
                </div>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </Container>
  );
}

const Container = styled.div`
  display: inline-flex;
  margin: 0px auto;
  width: 90vw;
  max-width: 1000px;

  .ant-form {
    width: 45vw;
    max-width: 500px;
  }
  
  .addFields {
    margin: 0px auto;
    width: 80%;
  }
  
  .addBtn {
    width: 40vw;
    min-width: 300px;
    max-width: 500px;
    margin: 30px 0px 50px 0px;
    padding: 0 10%;
  }
  
  .addTop {
    display: block;
    width: 100%;
    text-align: center;
    padding: 20px 0;
    margin-bottom: 30px;
    border-top: 2px solid #cecece;
    border-bottom: 2px dotted #cecece;

    b {
      font-size: 1.3rem;
      color: #5a5a5a;
    }
  }
  
  .addBottom{
    border-bottom: 2px solid #cecece;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .addDeleteBtn {
    float: left;
    margin: 5px;
  }

  .addSubmitBtn {
    float: right;
  }
`;
export default AddMenu;