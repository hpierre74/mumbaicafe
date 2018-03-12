import React, { Component } from 'react';
import { Container } from 'reactstrap';
import BookerV2 from '../Components/booker/BookerV2.jsx';
import BookerForm from '../Components/booker/BookerForm';
import NavComponent from '../Components/header/NavComponent.jsx';

class Book extends Component {
    
    render() { 
        return ( 
            <Container>
                <NavComponent active='book'/>
                <BookerV2>
                    <BookerForm />
                </BookerV2>
            </Container>
         )
    }
}
 
export default Book;