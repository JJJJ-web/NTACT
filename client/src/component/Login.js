import React from 'react';
import {FacebookLogin} from 'react-facebook-login-component';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state={
            isLoggedIn: false,
            userID: '',
            name: '',
            email: '',
        };
    }

    responseFacebook(response) {
        this.setState((state) => ({
            isLoggedIn: true,
            userID: response.userID,
            name: response.name,
            email: response.email,
        }), () => console.log(response));
    };

    render() {
        let fbContent;

        if(this.state.isLoggedIn) {
            <div onClick={alert('개인정보 수집에 동의 하십니까?(예시)')}>
            </div>;
        } else {
            fbContent = (<FacebookLogin
                socialId="236622028050557" 
                language="en_US"
                cookie={true}
                fields="id,name,email"
                responseHandler={this.responseFacebook.bind(this)}
                xfbml={true}
                disabled={false}
                version="v3.3"
                className="facebook-login"
                buttonText="Login With Facebook" />);
        }

        return (
            <div>
                {fbContent}
            </div>
        );
    }
}

export default Login;