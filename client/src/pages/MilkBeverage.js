import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';

class MilkBeverage extends Component {
    handleOnClick = (e) => {
        console.log(e.currentTarget.className);
    };

    render() {
        const milkBeverage = [
            {
                id: 'BlackSugarLatte',
                name: 'Black Sugar Latte',
                price: 3300,
                image: '/img/MILK BEVERAGE/BlackSugarLatte.png',
            },
            {
                id: 'ICEDChocolateLatte',
                name: 'ICED Chocolate Latte',
                price: 3700,
                image: '/img/MILK BEVERAGE/ICEDChocolateLatte.png',
            },
            {
                id: 'ICEDGrainLatte',
                name: 'ICED Grain Latte',
                price: 3500,
                image: '/img/MILK BEVERAGE/ICEDGrainLatte.png',
            },
            {
                id: 'ICEDGreenTeaLatte',
                name: 'ICED Green Tea Latte',
                price: 3700,
                image: '/img/MILK BEVERAGE/ICEDGreenTeaLatte.png',
            },
            {
                id: 'ICEDSweetPotatoLatte',
                name: 'ICED Sweet Potato Latte',
                price: 4000,
                image: '/img/MILK BEVERAGE/ICEDSweetPotatoLatte.png',
            },
            {
                id: 'ICEDWhiteChocolateLatte',
                name: 'ICED White Chocolate Latte',
                price: 3700,
                image: '/img/MILK BEVERAGE/ICEDWhiteChocolateLatte.png',
            },
        ];

        const menuList = milkBeverage.map((menu) => 
            <div key={menu.id} className={menu.id +' '+ menu.price} onClick={this.handleOnClick}>
                <img src={menu.image} />
                <div>{menu.name}</div>
                <div>{menu.price}</div>
            </div>);

        return (
            <div>
                <Link to='/coffee'>
                    <button>COFFEE</button>
                </Link>
                <button>MILK BEVERAGE</button>
                <Link to ='/ade'>
                    <button>ADE</button>
                </Link>
                <div>
                    {menuList}
                </div>
                <Cart />
            </div>
        );
    }
}

export default MilkBeverage;