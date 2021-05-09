import React, { useState } from 'react';
import { useHistory, useLocation, withRouter } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import socket from '../SocketInfo';

/*eslint-disable */
function PaymentResult() {
  let loading;
  const { userID } = JSON.parse(sessionStorage.getItem('userInfo'));
  const history = useHistory();
  const location = useLocation();
  let success;
  let isSuccessed;
  let query;
  let merchant_uid;
  let error_msg;
  let imp_uid;
  let imp_success;
  let resultType;
  let colorType;

  async function getMerchant(merchant_uid) {
    let getStat;
    await axios.get(`/api/payments/result?id=${merchant_uid}`).then((res) => {
      if (res.data.status === "success") {
        getStat = true;
        success = res.data.status;
        imp_uid = res.data.imp_uid;
        isSuccessed = getIsSuccessed();
        mobileSetSuccess();
      } else {
        getStat = true;
        success = res.data.status;
        error_msg = res.data.message;
        const impFirstIndex = error_msg.indexOf("(");
        const impLastIndex = error_msg.indexOf(")");
        imp_uid = error_msg.substring(impFirstIndex + 1, impLastIndex);
        isSuccessed = getIsSuccessed();
        mobileSetSuccess();
      }
    }).catch((err) => {
      getStat = false;
      console.log(err);
    });
    return getStat;
  }

  function getOrderData() {
    axios
    .post(`/api/payments/${userID}/${merchant_uid}`)
    .then((res) => {
      history.push({
        pathname: '/payment_success',
        state: { orderInfo: res.data },
      });
    })
    .catch((error) => false);
  }

  if (location.state === undefined) { // 모바일
    query = queryString.parse(location.search);
    merchant_uid = query.id;
    getMerchant(merchant_uid).then((res) => {
      loading = true;
      setReturn();
    }).catch((err) => {
      // 에러 처리
    });
  } else { // pc버전
    query = location.state.result;
    merchant_uid = query.merchant_uid;
    error_msg = query.error_msg;
    imp_uid = query.imp_uid;
    success = query.success;
    loading = true;
    isSuccessed = getIsSuccessed();
    pcSetIsSuccess();
    setReturn();
  }

  function setReturn() {
    if (loading === true && isSuccessed === false) {
      history.push({
        pathname: '/payment_failed',
        state: {
          colorType: colorType,
          resultType: resultType,
          merchant_uid: merchant_uid,
          error_msg: error_msg,
          imp_uid: imp_uid,
        },
      });
      return null;
    }
    else if (loading === true && isSuccessed === true) {
      socket.emit('F');
      getOrderData();
      return null;
    }
  }

  function getIsSuccessed() {
    if (typeof imp_success === 'string') return imp_success === 'true';
    if (typeof imp_success === 'boolean') return imp_success === true;
    if (typeof success === 'string') return success === 'true';
    if (typeof success === 'boolean') return success === true;
  }

  function mobileSetSuccess() {
    if(success === "success")
      isSuccessed = true;
    else
      isSuccessed = false;
    resultType = isSuccessed ? "성공" : "실패";
    colorType = isSuccessed ? "#52c41a" : "#f5222d";
  }

  function pcSetIsSuccess() {
    resultType = isSuccessed ? "성공" : "실패";
    colorType = isSuccessed ? "#52c41a" : "#f5222d";
    return ;
  }
  return null;
}

export default withRouter(PaymentResult);
