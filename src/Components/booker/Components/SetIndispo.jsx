import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../../../firebase.conf.js';
import { Container, Row, FormGroup, Col, Form, Input, Button, Label } from "reactstrap";

let bookabilityRef = firebase.database().ref('booker/bookability');


class SetIndispo extends Component {
    constructor(props) {
        super(props);
        this.handleInputChanges = this.handleInputChanges.bind(this);
        this.state = {
            max_bookings: this.props.MAX_BOOKINGS,
            bookabilities: this.props.bookabilities,
            date:'',
            service:''
        }
    }


    handleInputChanges(e){
        e.preventDefault();
        this.setState({ [e.target.name]: e.target.value });
    }

    setIndisponibility(e,date,service){
        e.preventDefault();
        bookabilityRef.child(date).update({
            [service] : this.state.max_bookings
        })
        .then(success => {
            alert('success');
        }).catch(err => {
            alert('Error');
        })
    }


    render() { 
        return (
            <Container>
                <Row>
                    <Col>           
                        <div className="panel panel-primary">
                            <h4 className="panel-heading">Déclarer Indisponibilité</h4>
                            <Form className='panel-body' onSubmit={(e) => this.setIndisponibility(e,this.props.reverseDate(this.state.date), this.state.service)}>
                                <Row>
                                    <Col xs="12" sm="6" md="6">
                                        <FormGroup>
                                            <Label>
                                                Date d'indisponibilité :
                                            </Label>
                                            <Input  required
                                                    type='date'
                                                    name='date' 
                                                    onChange={ (e) => this.handleInputChanges(e) }>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" md="6">
                                        <FormGroup>
                                            <Label>
                                                Service indisponible :
                                            </Label>
                                            <Input  required
                                                    type='select'
                                                    name='service' 
                                                    onChange={ (e) => this.handleInputChanges(e) }>
                                                <option value=""></option>
                                                <option value="lunch">Midi</option>
                                                <option value="dinner-1">Soir, 1er service</option>
                                                <option value="dinner-2">Soir, 2e service</option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="12" md="12">
                                        <Button color='primary'>
                                            Sauvegarder indisponibilité
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}
 
export default SetIndispo;