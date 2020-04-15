import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCJi0KjiDPBf60-X5oPkoeaWICHnl_Thp0",
    authDomain: "partscrib-2fe52.firebaseapp.com",
    databaseURL: "https://partscrib-2fe52.firebaseio.com",
    projectId: "partscrib-2fe52",
    storageBucket: "partscrib-2fe52.appspot.com",
    messagingSenderId: "154343080345",
    appId: "1:154343080345:web:3c3060fc9d028b51e7d308"
};


export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.database();
export const db = baseDb;