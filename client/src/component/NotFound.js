import React from'react';
import ReactDOM from 'react-dom';
import { useHistory, Link } from 'react-router-dom';
import { Result, Button } from 'antd';


function NotFound() {
  const history = useHistory();
  return (
    <Result
      status="404"
      title="404"
      subTitle="존재하지 않는 페이지입니다."
      extra={<Button type="primary" onClick={() => { history.goBack(); }}>돌아가기</Button>}
    />
  );
}

export default NotFound;