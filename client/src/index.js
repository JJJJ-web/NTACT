import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import {PersistGate} from 'redux-persist/integration/react';
import rootReducer from './store/reducers/';
import persistStore from 'redux-persist/es/persistStore';

const store = createStore(rootReducer);
const persistor = persistStore(store);

ReactDOM.render(
    <Provider store={store}>
        <PersistGate persistor={persistor}>
            <Router>
                <App/>
            </Router>
        </PersistGate>
    </Provider>,
    document.getElementById('root'),
);

reportWebVitals();
