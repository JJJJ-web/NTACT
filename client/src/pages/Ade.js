import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';

class Ade extends Component {
    handleOnClick = (e) => {
        console.log(e.currentTarget.className);
    };
    
    render() {
        const ade = [
            {
                id: 'Grapefruit',
                name: 'Grape fruit',
                price: 3800,
                image: '/img/ADE/Grapefruit.png',
            },
            {
                id: 'GreenGrape',
                name: 'Green Grape',
                price: 3700,
                image: '/img/ADE/GreenGrape.png',
            },
            {
                id: 'Lemon',
                name: 'Lemon',
                price: 3700,
                image: '/img/ADE/Lemon.png',
            },
        ];

        const menuList = ade.map((menu) =>
            <div key={menu.id} className={menu.id +' '+ menu.price} onClick={this.handleOnClick}>
                <img src={menu.image} />
                <div>{menu.name}</div>
                <div>{menu.price}</div>
            </div>);

        return ( 
            <div>
                <Link to='/milkbeverage'>
                    <button>MILK BEVERAGE</button>
                </Link>
                <button>ADE</button>
                <Link to ='/shake'>
                    <button>SHAKE</button>
                </Link>
                <div>
                    {menuList}
                </div>
                <Cart />
            </div>
        );
    };
}

export default Ade;