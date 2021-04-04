import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Popconfirm, message} from 'antd';
import axios from 'axios';

function CancelButton({orderInfo, reload}) {
    const [popVisible, setPopVisible] = useState(false);

    function checkOrderStat(stat) {
        if (stat === 'ready') {
            return false;
        } else {
            return true;
        }
    }
    function cancelPay() {
        axios({
            url: '/api/payments/cancel',
            method: 'POST',
            headers: {
            },
            data: {
                merchant_uid: orderInfo.id, // 주문번호
            },
        }).then((res) => { // 환불 성공시
            if (res.status === 200) { // 정상 처리
                orderInfo.order_stat = res.data.order_stat;
                reload(res.data.order_stat);
                message.success('주문 취소 완료. 환불 요청되었습니다.');
            } else if (res.status === 401) {
                console.log(res);
                message.success('유효하지 않은 요청입니다.');
            } else {
                console.log(res);
                alert('환불 실패');
            }
        }).catch((error) => {
            console.log(error);
            alert('환불 실패');
        });
    }

    return(
        <Popconfirm disabled={checkOrderStat(orderInfo.order_stat)} placement="leftTop" title="모든 메뉴가 주문 취소됩니다." onConfirm={cancelPay} okType="danger" okText="취소 신청" cancelText="닫기">
            <Button danger size="small" disabled={checkOrderStat(orderInfo.order_stat)} onClick={() => setPopVisible(!popVisible)}>결제 취소</Button>
        </Popconfirm>
    );
}

export default CancelButton;