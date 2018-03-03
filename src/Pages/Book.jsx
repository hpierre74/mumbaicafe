import React, { Component } from 'react';
import { Container } from 'reactstrap';
import Booker from '../Components/booker/Booker.jsx';
import NavComponent from '../Components/header/NavComponent.jsx';

class Book extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            isAdmin: false
         }
    }
    render() { 
        return ( 
            <Container>
                <NavComponent active='book'/>
                <Booker isAdmin={this.state.isAdmin} />
            </Container>
         )
    }
}
 
export default Book;