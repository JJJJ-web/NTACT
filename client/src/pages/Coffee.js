import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';

class Coffee extends Component {
    handleOnClick = (e) => {
        console.log(e.currentTarget.className);
    };
    
    render() { 
        const coffee = [
            {
                id: 'ICEDAmericano',
                name: 'ICED Americano',
                price: 3200,
                image: '/img/COFFEE/ICEDAmericano.png',
            },
            {
                id: 'ICEDCafeMocha',
                name: 'ICED Cafe Mocha',
                price: 3900,
                image: '/img/COFFEE/ICEDCafeMocha.png',
            },
            {
                id: 'ICEDCafeLatte',
                name: 'ICED Cafe Latte',
                price: 3500,
                image: '/img/COFFEE/ICEDCafeLatte.png',
            },
            {
                id: 'ICEDCappuccino',
                name: 'ICED Cappuccino',
                price: 3700,
                image: '/img/COFFEE/ICEDCappuccino.png',
            },
        ];

        const menuList = coffee.map((menu) => 
            <div key={menu.id} className={menu.id +' '+ menu.price} onClick={this.handleOnClick}>
                <img src={menu.image} />
                <div>{menu.name}</div>
                <div>{menu.price}</div>
            </div>);

        return (
            <div>
                <Link to='/shake'>
                    <button>SHAKE</button>
                </Link>
                <button>COFFEE</button>
                <Link to ='/milkbeverage'>
                    <button>MILK BEVERAGE</button>
                </Link>
                <div>
                    {menuList}
                </div>
                <Cart />
            </div>
            
        );
    };
}

export default Coffee;