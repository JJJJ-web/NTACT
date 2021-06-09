import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import cartReducer from './cartReducer';

const rootReducer = combineReducers({
  cartReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

export default persistReducer(persistConfig, rootReducer);