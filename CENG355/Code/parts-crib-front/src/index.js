import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router } from "react-router-dom";
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';
import { verifyAuth } from "./actions/auth"
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import "firebase/database";
import firebase from 'firebase/app'
import { myFirebase } from './firebase/firebase'


const fbConfig = {}


const configureStore = (persistedState) => {

  const store = createStore(
    rootReducer, 
    applyMiddleware(thunk),
    );
    store.dispatch(verifyAuth);
    return store;

}

const store = configureStore();
// Initialize firebase instance
//firebase.initializeApp(fbConfig);

const rrfConfig = {
  userProfile: 'users'
}

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
  // createFirestoreInstance // <- needed if using firestore
}

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <Router>
        <App />
      </Router>
    </ReactReduxFirebaseProvider>
  </Provider>
  ,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
