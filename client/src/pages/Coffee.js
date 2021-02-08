import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import Cart from '../component/Cart';
import axios from 'axios';

class Coffee extends Component {
    constructor(props) {
        super(props);
    }

    state = {
        data: [],
    };

    async getMyData() {
        let data = await axios.get('/api/menus');
        data = data.data;
        data = data.filter((r) => {
            return r.category_id === 100;
        });
        // console.log('data is ' + JSON.stringify(data));
        this.setState({data});
    }

    componentDidMount() {
        this.getMyData();
    }

    render() { 
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
                    {
                        this.state.data.map((menu) => {
                            return(
                                <div key={menu.id}>
                                    <img src={menu.img_url} />
                                    <p>{menu.name_kor}</p>
                                    <p>{menu.price}</p>
                                </div>
                            );
                        })
                    }
                </div>
                <Cart />
            </div>
            
        );
    };
}

export default Coffee;