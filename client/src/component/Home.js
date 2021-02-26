import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

function Home() {
    return (
        <div>
            <img src='/ntact512.png'/>
            <br />
            <Link to='/login'>
                <Button>회원</Button>
            </Link>
            <Link to='/coffee'>
                <Button>비회원</Button>
            </Link>
        </div>
    );
}

export default Home;