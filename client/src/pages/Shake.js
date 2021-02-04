import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';

class Shake extends Component {
    handleOnClick = (e) => {
        console.log(e.currentTarget.className);
    };
    
    render() {
        const shake = [
            {
                id: 'ChocolateShake',
                name: 'Chocolate Shake',
                price: 3700,
                image: '/img/SHAKE/ChocolateShake.png',
            },
            {
                id: 'OriginShake',
                name: 'Origin Shake',
                price: 3700,
                image: '/img/SHAKE/OriginShake.png',
            },
            {
                id: 'StrawberryShake',
                name: 'Strawberry Shake',
                price: 3700,
                image: '/img/SHAKE/StrawberryShake.png',
            },
        ];

        const menuList = shake.map((menu) =>
            <div key={menu.id} className={menu.id +' '+ menu.price} onClick={this.handleOnClick}>
                <img src={menu.image} />
                <div>{menu.name}</div>
                <div>{menu.price}</div>
            </div>);

        return (
            <div>
                <Link to='/ade'>
                    <button>ADE</button>
                </Link>
                <button>SHAKE</button>
                <Link to ='/coffee'>
                    <button>COFFEE</button>
                </Link>
                <div>
                    {menuList}
                </div>
                <Cart />
            </div>
        );
    };
}

export default Shake;