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

function MenuTable() {
  const [products, setProducts] = useState([]);
  const [visible, setVisible] = useState(false);
  // eslint-disable-next-line prefer-const
  let [selectThisMenu, setSelectThisMenu] = useState([]);
  const onCreate = (values) => {
    setVisible(false);
  };

  function getThisMenu(menu) {
    setSelectThisMenu(selectThisMenu = menu);
  }

  async function statClickHandler(product) {
    getThisMenu(product);
    await axios.patch(`/api/menus/status/${product.id}`,
      {
        headers: {},
      }).then((res) => {
      if (res.status === 200) {
        // eslint-disable-next-line no-unused-expressions
        product.sales_stat === 1 ? setSelectThisMenu(
          selectThisMenu.sales_stat = 0,
        ) : setSelectThisMenu(
          selectThisMenu.sales_stat = 1,
        );
        message.success(`[${product.menu_kor}] 상태가 변경되었습니다.`, 10);
      } else {
        message.error(`[${product.menu_kor}] 상태 변경에 실패하였습니다.`, 10);
      }
    });
  }

  function deleteMenu(menu) {
    axios.delete(`/api/menus/${menu.id}`)
      .then((res) => {
        if (res.status === 200) {
          message.success(`[${menu.menu_kor}] 메뉴를 삭제했습니다.`, 10);
          setTimeout(() => window.location.replace('/admin'), 5000);
        } else {
          console.log(res);
          message.error('메뉴 삭제 처리에 실패하였습니다.', 10);
        }
      }).catch((error) => {
        console.log(error);
        message.error('메뉴 삭제 처리에 실패하였습니다.', 10);
      });
  }


  function showDeleteConfirm(menu) {
    confirm({
      title: '실수 주의!',
      icon: <DeleteOutlined />,
      content: `[${menu.category_kor}] 카테고리에 속한 [${menu.menu_kor}] 메뉴를 삭제하겠습니까?`,
      okText: '삭제',
      okType: 'danger',
      cancelText: '취소',
      onOk() {
        deleteMenu(menu);
      },
    });
  }

  const columns = [
    {
      title: '카테고리',
      dataIndex: 'category_kor',
      filters: [
        { text: '커피', value: 1 },
        { text: '음료', value: 2 },
        { text: '에이드', value: 3 },
        { text: '쉐이크', value: 4 },
        { text: '블렌딩 티', value: 5 },
        { text: '플랫치노', value: 6 },
        { text: '빙수', value: 7 },
        { text: '병음료', value: 8 },
      ],
      onFilter: (value, record) => record.category_id === value,
      width: '15%',
      align: 'center',
    },
    {
      title: '이미지',
      dataIndex: 'img_url',
      render: (item) => <img src={item} width="70vw" alt="" />,
      width: '10%',
      align: 'center',
    },
    {
      title: '메뉴명 (한국어)',
      dataIndex: 'menu_kor',
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.menu_kor < b.menu_kor,
      width: '30%',
      align: 'center',
    },
    {
      title: '메뉴명 (영어)',
      dataIndex: 'menu_eng',
      width: '30%',
      align: 'center',
    },
    {
      title: '상태',
      dataIndex: 'sales_stat',
      filters: [
        { text: '판매중', value: 1 },
        { text: '품절', value: 0 },
      ],
      onFilter: (value, record) => record.sales_stat === value,
      render: (value, record) => (
        <Switch
          checkedChildren="판매중"
          unCheckedChildren="품절"
          style={{ width: '4.5rem' }}
          onClick={() => statClickHandler(record)}
          checked={record.sales_stat === 1}
        />
      ),
      width: '10%',
      align: 'center',
    },
    {
      title: '가격',
      dataIndex: 'price',
      render: (price) => `${price.toLocaleString()}원`,
      sortDirections: ['descend', 'ascend'],
      sorter: (a, b) => a.price - b.price,
      width: '15%',
      align: 'center',
    },
    {
      title: '메뉴 수정',
      dataIndex: 'modify',
      render: (value, record) => (
        <>
          <Button
            type="primary"
            onClick={() => {
              setVisible(true);
              getThisMenu(record);
            }}
            size="small"
          >
            <FormOutlined style={{ fontSize: '15px', color: '#fff' }} />
            수정
          </Button>
          <CollectionCreateForm
            menu={record}
            visible={visible}
            onCreate={onCreate}
            onCancel={() => {
              setVisible(false);
            }}
          />
        </>
      ),
      width: '5%',
      align: 'center',
    },
    {
      title: '메뉴 삭제',
      dataIndex: 'delete',
      render: (value, row) => (
        <>
          <Button
            danger
            onClick={() => showDeleteConfirm(row)}
            size="small"
          >
            <DeleteOutlined style={{ fontSize: '15px', color: 'red' }} />
          </Button>
        </>
      ),
      width: '5%',
      align: 'center',
    },
  ];

  function fetch() {
    // axois한번으로 메뉴+카테고리명 데이터 받아오기
    axios.get('/api/menus?category=true').then((res) => {
      setProducts(res.data);
    });
  }

  useEffect(() => {
    fetch();
  }, []);


  function getCategory() {
    const list = [];
    products.forEach((item) => {
      list.push(item.category_kor);
    });
    const c = list.filter((item, index) => list.indexOf(item) === index);
    return c;
  }

  async function editMenuClickHandler() {
    await axios.put('/api/menus/status', { menu: selectThisMenu }).then((res) => {
      if (res.status === 200) {
        message.success(`[${selectThisMenu.menu_kor}] 메뉴가 수정되었습니다.`, 10);
      } else {
        message.error(`[${selectThisMenu.menu_kor}] 메뉴 수정에 실패하였습니다.`, 10);
      }
    });
  }

  function CollectionCreateForm({
    menu, visible, onCreate, onCancel,
  }) {
    const [form] = Form.useForm();
    return (
      <Modal
        visible={visible}
        title={menu.name_kor}
        okText="수정 완료"
        cancelText="취소"
        onCancel={onCancel}
        onOk={() => {
          form.validateFields().then((values) => {
            setSelectThisMenu(selectThisMenu.menu_kor = values.MenuNameKorean);
            setSelectThisMenu(selectThisMenu.menu_eng = values.MenuNameEnglish);
            setSelectThisMenu(selectThisMenu.price = Number(values.MenuPrice));
            setSelectThisMenu(selectThisMenu.description = values.description);

            form.resetFields();
            editMenuClickHandler();
            onCancel();
          }).catch((info) => {
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
              style={{ width: '7rem' }}
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
              style={{ width: 200 }}
              value={selectThisMenu.category_kor}
              optionFilterProp="children"
              /* eslint-disable-next-line max-len */
              filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
              {
                getCategory().map((item) => (
                  <Option
                    key={item}
                    value={item}
                  >
                    {item}
                  </Option>
                ))
              }
              <Option value="카테고리 추가">...카테고리 추가</Option>
            </Select>
          </Form.Item>
          <Form.Item
            noStyle
            shouldUpdate={(
              prevValues, currentValues,
            ) => prevValues.MenuCategory
              !== currentValues.MenuCategory}
          >
            {({ getFieldValue }) => (getFieldValue('MenuCategory') === '카테고리 추가' ? (
              <Form.Item
                name="카테고리 새로 추가"
                label="카테고리 새로 추가"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input maxLength={25} />
              </Form.Item>
            ) : null)}
          </Form.Item>
          <Form.Item name="description" label="Description" initialValue={selectThisMenu.description}>
            <Input type="textarea" />
          </Form.Item>
        </Form>
      </Modal>
    );
  }

  return (
    <Table
      bordered
      columns={columns}
      rowKey={(item) => item.id}
      dataSource={products}
    />
  );
}
export default MenuTable;