import cartReducer from './cartReducer';
import {combineReducers} from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
    cartReducer,
});

const persistConfig = {
    key: 'root',
    storage: storage,
};

export default persistReducer(persistConfig, rootReducer);