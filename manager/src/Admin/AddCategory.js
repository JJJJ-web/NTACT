import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import {
  Input, Select, InputNumber, Upload, Form, Button, Space, message, Divider,
} from 'antd';
import { LoadingOutlined, DeleteOutlined, PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import axios from 'axios';

function AddCategory() {
  let addCount = 0;
  const [addSuccess, setAddSuccess] = useState(false);
  
  function handleSubmit(formdata) {
    const form = formdata.newCaaddMenustegory[0];
    console.log(form);
    axios.post('/api/categories', {
      name_kor: form.nameKor,
      name_eng: form.nameEng,
    })
      .then((res) => {
        if (res.status === 201) {
          message.success(`[${form.nameKor}] 카테고리 생성을 완료했습니다.`, 10);
          setAddSuccess(true);
          setTimeout(() => window.location.replace('/admin'), 5000);
        }
      })
      .catch((error) => {
        message.error('카테고리 생성에 실패하였습니다. 다시 시도해주세요.', 10);
        console.log('카테고리 등록 실패', error);
      });
  }

  return(
    <>
      <Form
        onFinish={(values) => {
          addCount = 0;
          handleSubmit(values);
        }}
        name="dynamic_form_nest_item"
        autoComplete="off"
      >
        <Form.List name="newCaaddMenustegory">
          {(fields, { add, remove }) => (
            <>
              <Form.Item className="addBtn">
                <Button
                  onClick={() => {
                    if(addCount === 0) {
                      add();
                    }
                    addCount++;
                  }}
                  block
                  icon={<PlusOutlined />}
                  // style={{ visibility: addCount ? 'hidden' : 'visible' }}
                >
                  새 카테고리 생성
                </Button>
              </Form.Item>
              {fields.map(({ key, name, fieldKey }) => (
                <div className="addFields" key="add2" style={{ visibility: addSuccess ? 'hidden' : 'visible' }}>
                  <div className="addTop">
                    <Button
                      className="addDeleteBtn"
                      onClick={() => {
                        remove(name);
                        addCount = 0;
                      }}
                    >
                      취소
                    </Button>
                    <b>
                      카테고리 생성
                    </b>
                    <Button type="primary" htmlType="submit" className="addSubmitBtn">
                      등록
                    </Button>
                  </div>

                  <Form.Item
                    name={[name, 'nameKor']}
                    rules={[{ required: true, message: '한글명은 필수입력입니다.' }]}
                  >
                    <Input style={{ flex: 'auto' }} placeholder="카테고리(한국어)" />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'nameEng']}
                    rules={[{ required: true, message: '영어명은 필수입력입니다' }]}
                  >
                    <Input style={{ flex: 'auto' }} placeholder="카테고리(영어)" />
                  </Form.Item>

                  <div className="addBottom" />
                </div>
              ))}
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
}
export default AddCategory;