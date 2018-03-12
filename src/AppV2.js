import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Main from './Pages/Main.jsx';
import Admin from './Pages/Admin.jsx';
import Book from './Pages/Book.jsx';

 

class App extends Component {
 
  render() {
  
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route exact path="/book" component={Book} />
          <Route exact path="/admin" component={Admin} />
          {/* <Route exact path="/admin/bookings/:id" component={BookingCard} /> */}
          <Route component={Main} />
        </Switch>
      </div>
    );
  }
}

export default App;
