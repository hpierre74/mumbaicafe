import * as firebase from 'firebase';
import '../firebase.conf.js';

// const config = {
//     apiKey: "AIzaSyC7nS-QSgNY_ug38x3A-KnDZqTxeneV-Zw",
//     authDomain: "mumbai-react.firebaseapp.com",
//     databaseURL: "https://mumbai-react.firebaseio.com",
//     projectId: "mumbai-react",
//     storageBucket: "mumbai-react.appspot.com",
//     messagingSenderId: "280498275819"
// };
// const db_init  = firebase.initializeApp(config);
const db = firebase.database();

class FirebaseService {
    static GenerateNewDataKey(ref) {
        return db.ref().child(ref).push().key;
    }
    static Get(ref) {
        return db.ref(ref).once('value')
        .then((snapshot) => {
            return snapshot.val();
        })
        .catch(error => {
            console.log(error);
        })
        
    }
    static Update(ref, key, newData, callback) {
        return db.ref(ref).update({[key]: newData})
        .then(success => {
            console.log(success);
            callback();
            
        })
        .catch(error => {
            console.log(error);
        })
    }
    static Delete(ref) {
        return db.ref(ref).remove()
        .then(success => {
            console.log(success);
        })
        .catch(error => {
            console.log(error);
        })
    }

}

export default FirebaseService;

