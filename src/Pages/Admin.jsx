import React, { Component } from 'react';
import { Container } from 'reactstrap';
import NavAdmin from '../Components/admin/NavAdmin.jsx';
import * as firebase from 'firebase';
import '../firebase.conf.js';
import Login from '../Components/forms/login/login.jsx';
import Logout from '../Components/forms/logout/logout.jsx';
import BookerV2 from '../Components/booker/BookerV2.jsx';
import BookingManager from '../Components/admin/BookingManager';
import BookerForm from '../Components/booker/BookerForm';
import Main from './Main';
//import Clients from '../Components/admin/Clients';


class Admin extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isAdmin: false
        }
    }
    //Login
  login(e,email, password) {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then((success) => {
      this.setState({
          isAdmin:true
      });
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      if (errorCode === 'auth/wrong-password') {
        alert('Wrong password.');
      } else {
        alert(errorMessage);
      }
    })
  }


  logout(e) {
    e.preventDefault();
    firebase.auth().signOut()
      .then((success) => {
        this.setState({
          isAdmin:false
        });
        window.location = '/';
      })
      .catch((error) => {
        alert('Logout Failed');
      });
      

}
    render() { 
        return ( 
            <Container>
                {
                  (!this.state.isAdmin)?
                    <Login login={this.login.bind(this)}/>
                    :
                    <div>
                      <NavAdmin />
                      {/* <Booker isAdmin={this.state.isAdmin}/> */}
                      <BookerV2>
                        <BookingManager />
                        <BookerForm />
                      </BookerV2>
                      <Main isAdmin={this.state.isAdmin}/>
                      <Logout logout={this.logout.bind(this)}/>
                      
                    </div>
                }
            </Container>
         )
    }
}
 
export default Admin;