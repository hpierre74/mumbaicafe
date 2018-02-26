import React, { Component } from 'react';
import moment from 'moment';
import 'moment/locale/fr';
import * as firebase from 'firebase';
import '../../../firebase.conf.js';
import {
    Alert,  Collapse,   Form,       Row, 
    Col,    Button,     Container,  FormGroup, 
    Label,  Input,      FormText } from 'reactstrap';


class CreateBooking extends Component {
    constructor(props) {
        super(props);
        this._handleBookingSubmit = this._handleBookingSubmit.bind(this);
        this._handleInputChanges = this._handleInputChanges.bind(this);
        this.toggle = this.toggle.bind(this);
        this.setError = this.setError.bind(this);
        this.newBooking = [];
        this.state = {
            alertMessage:'',
            alertType:'',
            collapse: false,
            bookabilities: [],
            name: '',
            tel: '',
            email: '',
            date: '',
            time: '',
            persons: '',
            note: ''
        }

    }


    componentWillMount() {
        firebase.database().ref('booker/bookability').on('value', snapshot => {
            this.setState({
                bookabilities : snapshot.val()
            })
        })
    }

    toggle(key, value){
        this.setState({ [key] : value });
    }

    setError(type, message) {
        this.setState({ 
            collapse : true,
            alertType: type,
            alertMessage: message
         });
    }

    sortService() {
        if (this.newBooking.time === "12:00" ||
            this.newBooking.time === "12:30" ||
            this.newBooking.time === "13:00" ||
            this.newBooking.time === "13:30") {
            this.newBooking.service = "lunch"
        } else if (this.newBooking.time === "19:00" || this.newBooking.time === "19:30") {
            this.newBooking.service = "dinner-1"
        } else if (this.newBooking.time === "21:30" || this.newBooking.time === "22:00" || this.newBooking.time === "22:30") {
            this.newBooking.service = "dinner-2"
        }
    }


    reverseDate(dateObj) {
        return dateObj.split("-").reverse().join("-");
    }

    _handleInputChanges(e) {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        });
        this.newBooking[e.target.name] = e.target.value;

    }

    verifyServiceBookability(date, service, persons, isAdmin) {
        if(!this.props.isAdmin){
        //Restrict booking days => return false on Friday dinner,Saturday or Sunday
            let weekDay = moment(this.reverseDate(date)).day();
            //let weekDays = moment(moment(date).format('DD-MM-YYYY')).days();

            console.log(date, weekDay);
            
            if (weekDay === 0) {
                this.setError('danger','Navrés, le Mumbai café n\'ouvre pas le dimanche.');
                return false;
            }
            if (weekDay === 6 && service === 'lunch') {
                this.setError('danger','Navrés, le restaurant est fermé le samedi midi.');
                return false;
            }
            if ((weekDay === 5 || weekDay === 6) && service !== 'lunch') {
                this.setError('danger','Réservation indisponible les vendredis et samedi soirs.');
                return false;
            }
            //All params need to be filled
            if (date && service && persons) {
                //restrict maximum persons allowed to book per service
                let MAX_BOOKINGS = this.props.MAX_BOOKINGS;
                //Allow booking, no booking existing at this date yet, 20 seats free
                if (this.state.bookabilities[date] === (undefined || null)) {
                    return true
                } else {
                    //Bookings already exist at this date, Allow booking if newBooking + oldBookings <= MAX_BOOKINGS  
                    Object.keys(this.state.bookabilities).map((booking, index) => {
                        if (date === booking && this.state.bookabilities[booking][service] !== (null||undefined)) {
                            Object.values(this.state.bookabilities[booking][service]).map((value, index) => {
                                MAX_BOOKINGS = MAX_BOOKINGS - value;
                            })
                        }
                    })
                    if ((MAX_BOOKINGS - persons) < 0) {
                        return false
                    } else {
                        return true
                    }
                }
            }
        } else { return true }
    }

    restrictLateBookings(service, date){
        let booking_date = this.reverseDate(date);
        if(service === "lunch") {
            if(moment(moment().format('YYYY-MM-DD HH:mm')).isSameOrAfter(moment().format("'"+booking_date+" 12:00'",'YYYY-MM-DD HH:mm'))){
                return false
            } else { return true }
        }
        if(service !== "lunch") {
            if(moment(moment().format('YYYY-MM-DD HH:mm')).isSameOrAfter(moment().format("'"+booking_date+" 18:30'",'YYYY-MM-DD HH:mm'))){
                return false
            } else { return true }

        }
    }

    _handleBookingSubmit(event) {
        event.preventDefault();
        
        this.newBooking.arrived = false;
        this.newBooking.bookStamp = (!this.newBooking.bookStamp) ? moment(this.newBooking.date).unix() : this.newBooking.bookStamp;
        //this.newBooking.date = (moment(this.newBooking.date).isValid()) ? this.reverseDate(this.newBooking.date) : this.newBooking.date;
        this.newBooking.timestamp = moment().format();
        this.sortService();
        if (this.newBooking.name === '' || this.newBooking.date === undefined || this.newBooking.time === "" || this.newBooking.tel === '' || this.newBooking.persons === '') {
            this.setError('danger','Veuillez remplir correctement tous les champs du formulaire');
            return;
        }
        else if (moment(new Date(this.newBooking.date)).dayOfYear() < moment().dayOfYear()) {
            this.setError('danger', 'Veuillez choisir une date ultérieure' );
            //alert('Choisir une date ultérieure')
            return;
        }
        else if (!this.props.isAdmin && !this.restrictLateBookings(this.newBooking.service, this.newBooking.date)) {
            this.setError('danger','Heure limite de réservation atteinte. Des tables sont peut être encore disponibles sur place.');
            return;
        }
        else if (this.newBooking.name.length > 30) {
            this.setError('danger', 'Nom trop long ou mal formaté' );
            //alert('wrong name')
            return;
        }
        else if ((this.newBooking.tel.length > 14) || (this.newBooking.tel.length < 10)) {
            this.setError("danger", 'Le numéro de téléphone doit faire entre 10 et 14 chiffres' );
            //alert('Le numéro de téléphone doit faire 10 chiffres minimum (06xxxxxxxx ou +33 6xxxxxxxx)');
            return;
        }
        else if (!this.props.isAdmin && (this.newBooking.persons <= 0 || this.newBooking.persons > 15)) {
            this.setError('danger', 'Indiquez le nombre de personnes présentes' );
            //alert('Indiquez le nombre de personnes');
            return;
        }
        else {
            // Get a key for a new Post.
            let newBookingKey = firebase.database().ref().child('booker/bookings').push().key;
            let bookingData = {
                name: this.newBooking.name,
                date: moment(new Date(this.newBooking.date)).format('DD-MM-YYYY'),
                service: this.newBooking.service,
                persons: this.newBooking.persons,
                time: this.newBooking.time,
                email:this.newBooking.email,
                tel:this.newBooking.tel,
                arrived: false,
                bookStamp: this.newBooking.bookStamp,
                datetime: new Date(this.newBooking.date+' '+this.newBooking.time),
                timestamp: moment(new Date()).format(),
                note: (this.newBooking.note !== undefined )?this.newBooking.note :'',
                key:newBookingKey
              };
            
              
              // Write the new post's data simultaneously in the posts list and the user's post list.
              let updates = {};
              updates['/contacts/' + bookingData.email ] = bookingData;
              updates['/booker/bookings/' + newBookingKey] = bookingData;
              updates['/booker/calendar/' + bookingData.date + '/' + bookingData.time + '/' + newBookingKey] = bookingData;
              //updates['booker/bookability'+ bookingData.date + '/' + bookingData.service ] = 
            (this.verifyServiceBookability(bookingData.date, bookingData.service, bookingData.persons)) ?
                
                firebase.database().ref().update(updates)
                    .then((response) => {
                        firebase.database().ref('booker/bookability/' + bookingData.date + '/' + bookingData.service)
                            .push(bookingData.persons)
                            .then(success => {
                                this.setState({
                                    alertType:'success',
                                    alertMessage:'Réservation  pour le '+ bookingData.date +' effectuée, à bientôt '+bookingData.name+' !',
                                    collapse: true,
                                    name: '',
                                    tel: '',
                                    email: '',
                                    date: '',
                                    time: '',
                                    persons: '',
                                    added: '',
                                    note: ''
                                });
                                this.newBooking = [];
                            }).catch(err => {
                                alert('Error');
                            })
                    })
                    .catch((error) => {
                        console.log(error);
                        this.setError('danger', 'Echec de la réservation, vérifiez que tous les champs de formulaires sont bien remplis.')
                        //alert('Echec de la réservation, veuillez renseigner tous les champs manuellement selon les formats indiqués.');
                    })
                : this.setError('warning',"La prise de réservation en ligne n'est pas disponible pour la date demandée, contactez le restaurant pour plus d'informations")
                //alert('Complet ou Réservation impossible les Vendredi soir, Samedi, Dimanche(fermé)')
        }
    }



    render() {
        return (
            <div>
                    <Row>
                        <Col>
                            <div className="panel panel-booker">

                                <h2 className="panel-heading">Réserver une table</h2>
                                <Form className="panel-body" onSubmit={(e) => this._handleBookingSubmit(e)} >
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label for="name">Nom</Label>
                                                <Input type="text" required
                                                    name="name"
                                                    id="name"
                                                    value={this.state.name}
                                                    onChange={(e) => this._handleInputChanges(e)}
                                                    placeholder="Prénom Nom" />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <FormGroup >
                                                <Label for="email">Email</Label>
                                                <Input type="email" required
                                                    name="email"
                                                    id="email"
                                                    value={this.state.email}
                                                    onChange={(e) => this._handleInputChanges(e)}
                                                    placeholder="exemple@exemple.com" />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label for="tel">Numéro de téléphone</Label>
                                                <Input type="tel" required
                                                    name="tel"
                                                    id="tel"
                                                    value={this.state.tel}
                                                    onChange={(e) => this._handleInputChanges(e)}
                                                    placeholder="(exemple : 0611223344)" />
                                                    <FormText>06XXXXXXXX ou +336XXXXXXXXX </FormText>
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label for="persons">Nombre de personnes</Label>
                                                <Input type="select" required
                                                    name="persons"
                                                    id="persons"
                                                    value={this.state.persons}
                                                    onChange={(e) => this._handleInputChanges(e)}
                                                >
                                                    <option value=""></option>
                                                    <option value="1">1</option>
                                                    <option value="2">2</option>
                                                    <option value="3">3</option>
                                                    <option value="4">4</option>
                                                    <option value="5">5</option>
                                                    <option value="6">6</option>
                                                    <option value="7">7</option>
                                                    <option value="8">8</option>
                                                    <option value="9">9</option>
                                                    <option value="10">10</option>
                                                    <option value="11">11</option>
                                                    <option value="12">12</option>
                                                    <option value="13">13</option>
                                                    <option value="14">14</option>
                                                    <option value="15">15</option>
                                                </Input>
                                                <FormText>Plus nombreux ? Contactez nous au 09.86.35.07.43</FormText>
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label for="date">Date de réservation</Label>
                                                <Input type="date" required
                                                    name="date"
                                                    id="date"
                                                    value={this.state.date}
                                                    placeholder='dd/mm/yyyy'
                                                    onChange={(e) => this._handleInputChanges(e)}
                                                />
                                            </FormGroup>
                                        </Col>
                                        <Col xs="12" sm="6">
                                            <FormGroup>
                                                <Label for="time">Heure d'arrivée</Label>
                                                <Input type="select" required
                                                    name="time"
                                                    id="time"
                                                    value={this.state.time}
                                                    onChange={(e) => this._handleInputChanges(e)}
                                                >   
                                                    <option value=""></option>
                                                    <optgroup label="Midi">
                                                        <option value="12:00">12:00</option>
                                                        <option value="12:30">12:30</option>
                                                        <option value="13:00">13:00</option>
                                                        <option value="13:30">13:30</option>
                                                    </optgroup>
                                                    <optgroup label="Soir">
                                                        <option value="19:00">19:00</option>
                                                        <option value="19:30">19:30</option>
                                                        <option value="21:30">21:30</option>
                                                        <option value="22:00">22:00</option>
                                                        <option value="22:30">22:30</option>
                                                    </optgroup>
                                                </Input>
                                            </FormGroup>
                                        </Col>
                                        <Col sm='12' xs='12'>
                                            <FormText style={{
                                                width: '75%', 
                                                border: '1px solid #ffc107',
                                                borderRadius:'3px',
                                                margin:'2.5% auto'
                                            }}
                                            color="warning">
                                                <small>
                                                <i className="text-warning fas fa-exclamation-triangle"></i>
                                                <br/> Nous ne prenons pas de réservation le vendredi soir et samedi soir.Fermé le samedi midi et dimanche.</small>
                                            </FormText>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col xs="12" sm={{ size: 8, offset: 2 }}>
                                            <FormGroup>
                                                <Label for="note">Ajouter un commentaire (optionnel)</Label>
                                                <Input type="text"
                                                    name="note"
                                                    id="note"
                                                    value={this.state.note}
                                                    onChange={(e) => this._handleInputChanges(e)}
                                                    placeholder="Allergies, etc... " />
                                            </FormGroup>
                                        </Col>
                                    </Row>
                                    <Button outline color="secondary">Créer la Réservation</Button>
                                </Form>
                                <Collapse isOpen={this.state.collapse}>
                                    <Alert style={{width:' 95%', margin:'0 auto 2.5%'}} isOpen={this.state.collapse} toggle={(e) => this.toggle('collapse',!this.state.collapse)} color={this.state.alertType}>
                                        {this.state.alertMessage}
                                    </Alert>
                                </Collapse>
                            </div>
                        </Col>
                    </Row>
            </div>
        )
    }
}


export default CreateBooking