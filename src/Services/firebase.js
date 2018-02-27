import * as firebase from 'firebase';
import '../firebase.conf.js';


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

