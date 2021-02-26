import React from 'react';
import {Link} from 'react-router-dom';
import {Button} from 'antd';

function Home() {
    return (
        <div>
            <Link to='/login'>
                <Button>회원</Button>
            </Link>
            <Button>비회원</Button>
        </div>
    );
}

export default Home;