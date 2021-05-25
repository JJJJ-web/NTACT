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

  return(
    <>
      <Form name="dynamic_form_nest_item" autoComplete="off">
        <Form.List name="newCategory">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey }) => (
                <>
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
                      새 카테고리 등록
                    </b>
                    <Button type="primary" htmlType="submit" className="addSubmitBtn">
                      등록
                    </Button>
                  </div>

                  <Form.Item
                    name={[name, 'first']}
                    rules={[{ required: true, message: '한글명은 필수입력입니다.' }]}
                  >
                    <Input style={{ flex: 'auto' }} placeholder="카테고리(한국어)" />
                  </Form.Item>
                  <Form.Item
                    name={[name, 'last']}
                    rules={[{ required: true, message: '영어명은 필수입력입니다' }]}
                  >
                    <Input style={{ flex: 'auto' }} placeholder="카테고리(영어)" />
                  </Form.Item>

                  <div className="addBottom" />
                </>
              ))}
              <Form.Item>
                <Button
                  className="addBtn"
                  type="dashed"
                  onClick={() => {
                    if(addCount === 0) {
                      add();
                    }
                    addCount++;
                  }}
                  block 
                  icon={<PlusOutlined />}
                  style={{ visibility: addCount ? 'hidden' : 'visible' }}
                >
                  새 카테고리 생성
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </>
  );
}
export default AddCategory;