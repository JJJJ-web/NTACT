import React, {useState} from 'react';
import 'antd/dist/antd.css';
import {Button, Popover} from 'antd';
import impCode from '../config/payment.json';
import axios from 'axios';

function CancelButton({orderInfo}) {
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
            console.log(res);
            alert('환불 성공');
        }).catch((error) => { // 환불 실패시
            console.log(error);
            alert('환불 실패');
        });
    }

    const refundPopover = (
        <div>
            <p>모든 메뉴가 주문 취소됩니다.</p>
            <p style={{textAlign: 'right'}}>
                <Button size="small" type="primary" danger onClick={cancelPay}>
                    취소 신청
                </Button>
                <Button size="small" type="dashed" danger onClick={()=> setPopVisible(!popVisible)}>
                    닫기
                </Button>
            </p>
        </div>
    );

    return(
        <Popover placement="rightTop" visible={popVisible} content={refundPopover} trigger="click">
            <Button danger size="small" disabled={checkOrderStat(orderInfo.order_stat)} onClick={() => setPopVisible(!popVisible)}>결제 취소</Button>
        </Popover>
    );
}

export default CancelButton;