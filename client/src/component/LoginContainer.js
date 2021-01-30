import React, { Component } from 'react';
import Login from './Login';

const LoginContainer = () => (
    <Store.Consumer>
        {store => (
            <Login onLogin={store.onLogin}/>)}
    </Store.Consumer>
)
export default LoginContainer;