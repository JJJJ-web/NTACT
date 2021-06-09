import React, { useEffect, useState } from 'react';
import 'antd/dist/antd.css';
import axios from 'axios';
import {
  Switch,
  Button,
  Modal,
  Form,
  Input,
  Select,
  InputNumber,
  Table, message,
} from 'antd';
import { FormOutlined, DeleteOutlined } from '@ant-design/icons';

const { Option } = Select;
const { confirm } = Modal;

function CategoryTable() {
  const [category, setCategory] = useState([]);

  function setCategories() {
    axios.get('/api/categories').then((res) => {
      setCategory(res.data);
    });
  }

  useEffect(() => {
    setCategories();
  }, []);

  function deleteMenu(data) {
    axios.delete(`/api/categories/${data.id}`)
      .then((res) => {
        if (res.status === 204) {
          message.success(`[${data.name_kor}] 카테고리를 삭제했습니다.`, 10);
          setTimeout(() => window.location.replace('/admin'), 5000);
        } else {
          console.log(res);
          message.error('카테고리 삭제 처리에 실패하였습니다.', 10);
        }
      }).catch((error) => {
        console.log(error);
        message.error('카테고리 삭제 처리에 실패하였습니다.', 10);
      });
  }
  
  function showDeleteConfirm(data) {
    confirm({
      title: '실수 주의!',
      icon: <DeleteOutlined />,
      content: `[${data.name_kor}] 카테고리에 속한 메뉴도 전부 삭제 됩니다. 삭제하겠습니까?`,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        deleteMenu(data);
      },
    });
  }
  
  const columns = [
    {
      title: '카테고리명(한글)',
      dataIndex: 'name_kor',
      sorter: (a, b) => a.name_kor < b.name_kor,
      width: '40%',
      align: 'center',
    },
    {
      title: '카테고리명(영어)',
      dataIndex: 'name_eng',
      width: '40%',
      align: 'center',
    },
    {
      title: '카테고리 삭제',
      dataIndex: 'delete',
      render: (value, row) => (
        <>
          <Button
            danger
            onClick={() => showDeleteConfirm(row)}
            size="small"
          >
            <DeleteOutlined style={{ fontSize: '15px', color: 'red' }} />
            삭제
          </Button>
        </>
      ),
      width: '20%',
      align: 'center',
    },
  ];

  return (
    <Table
      bordered
      columns={columns}
      rowKey={(item) => item.id}
      dataSource={category}
    />
  );
}
export default CategoryTable;