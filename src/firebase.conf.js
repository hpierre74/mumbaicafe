var firebase = require('firebase');
  // Initialize Firebase
var config = {
    apiKey: "AIzaSyC7nS-QSgNY_ug38x3A-KnDZqTxeneV-Zw",
    authDomain: "mumbai-react.firebaseapp.com",
    databaseURL: "https://mumbai-react.firebaseio.com",
    projectId: "mumbai-react",
    storageBucket: "mumbai-react.appspot.com",
    messagingSenderId: "280498275819"
};
var DB = firebase.initializeApp(config);
export default DB;
