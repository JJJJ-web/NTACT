import React, {Component} from 'react';
import {Link} from 'react-router-dom';

class Shake extends Component {
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
            <div key={menu.id}>
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
            </div>
        );
    };
}

export default Shake;