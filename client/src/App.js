import React, {Component} from 'react';
import Login from './component/Login';
import Header from './Layout/Header';
import Store from './Store/store';

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
        const {logged, onLogout} = this.state;

        return (
            <div>
                <Store.Provider value={this.state}>
                    <Header logged={logged} onLogout={onLogout}/>
                    <h3>Main Home Page</h3>
                    <Login/>
                </Store.Provider>
            </div>
        );
    }
}

export default App;