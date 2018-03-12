import React, { Component } from 'react';
import '../../styles/contact/contact.css';
//import GoogleApiWrapper from './SimpleMap.jsx';
import map from '../../assets/img/mumbaimap.png';
import { Container, Col, Row } from 'reactstrap';

class Contact extends Component {

    render() {
        return (
            
            <div className="contact" >
                <h2 className="contact-us">Nous Contacter</h2>
                <div className="gmap">
                        <Row>
                            <Col  sm='12' xs='12' md='6'>
                                <div>
                                    <h3>Adresse</h3>
                                    <p>Mumbai Café, 6 rue Sainte-Catherine, 69001, Lyon</p>
                                </div>
                            </Col>
                            <Col sm='12' md='6' xs='12'>
                                <img src={map} alt="localisation"/>
                            </Col>
                        </Row>
                     {/* <GoogleApiWrapper width="100%"/> */}
                </div>                
            </div>
        );
    }
}

export default Contact;