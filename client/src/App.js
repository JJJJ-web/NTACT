import React, {Component} from 'react';
import Router from './Routes/Router';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            logged: false,
            onLogin: this.onLogin,
            onLogout: this.onLogout,
        };
    }

    // Login Func
    onLogin() {
        this.setState({
            logged: true,
        });
    }

    // Logout Func
    onLogout() {
        this.setState({
            logged: false,
        });
    }

    render() {
        return (
            <div>
                <Router />
            </div>
        );
    }
}

export default App;