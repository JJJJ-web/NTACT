import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import {Tabs} from 'antd';
import 'antd/dist/antd.css';
import {StickyContainer, Sticky} from 'react-sticky';
import axois from 'axios';
import CategoryTabs from './CategoryTabs';
import Cart from '../component/Cart';

function Menu() {
    return (
        <>
            <CategoryTabs/>
            <Cart />
        </>
    );
}

export default Menu;