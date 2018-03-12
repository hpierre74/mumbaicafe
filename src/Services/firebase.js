import * as firebase from 'firebase';
import '../firebase.conf';


const db = firebase.database();

class Firebase {
  static DB() {
    return db;
  }

  // static isLogged() {
  //   firebase.auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       console.log('user is signed', user);
  //     } else {
  //       console.log('user is not');      
  //     }
  //   });
  // }
  static Get(ref) {
    return db.ref(ref).once('value')
    .then(snapshot => {
      return snapshot.val();
    })
    .catch(error => {
      console.log(error, 'get failed');
      return error;
    })
  }

  static getNewKey(ref) {
    return db.ref(ref).push().key;
  }

  static Update(ref, data) {
    return db.ref(ref).update(data)
    .then(success => {
      //console.log('updated');
      return data;
    })
    .catch(error => {
      //console.log('failed update');
      return error;
    })
  }

  static Delete(ref) {
    return db.ref(ref).remove()
    .then(success => {
      //console.log('success');
      return success;
    })
    .catch(error => {
      //console.log(error, 'failed remove');
      return error;
    })
  }

}
export default Firebase;

