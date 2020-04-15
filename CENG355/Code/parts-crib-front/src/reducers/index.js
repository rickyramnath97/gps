import { combineReducers } from 'redux';
import authReducer from "./authReducer"
import dataReducer from "./firebase";
import { firebaseReducer } from 'react-redux-firebase';

export default combineReducers({
    auth: authReducer,
    firebase: firebaseReducer
    //data: dataReducer

})