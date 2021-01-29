import React from 'react';
import {GoogleLogin} from 'react-google-login';

const clientId = 
  '126813901957-hvo7qgtpljnpn7rm7i2j0c8o0f6d00lg.apps.googleusercontent.com';

export default function googleLogin() {
  const onSuccess = async(response) => {
    console.log(response);
    const {googleId, profileObj: {email, name}} = response;
  };

  const onFailure = (error) => {
    console.log(error);
  };

  return(
    <div>
      <GoogleLogin
        clientId={clientId}
        responseType={'id_token'}
        onSuccess={onSuccess}
        onFailure={onFailure}/>
    </div>
  );
}