import React, { Component } from 'react';
import './booker.css';
import * as firebase from 'firebase';
import '../../firebase.conf.js';
import SetIndispo from './Components/SetIndispo.jsx';
import CreateBooking from './Components/CreateBooking.jsx';
import GetBookingsForm from './Components/GetBookingsForm.jsx';
import { Container } from 'reactstrap';



class Booker extends Component {
    constructor(props) {
        super(props);
        this.bookingsRef = firebase.database().ref('booker/bookings');
        this.bookabilityRef = firebase.database().ref('booker/bookability');
        this.roomAvalaible=[];
        this.state = {
            roomAvalaible: [],
            bookings: [],
            bookabilities:[],
            max_bookings:'',
            isAdmin: this.props.isAdmin
        
        }
    }
    
    componentWillMount() {
        this.getAllBookings();
        this.getBookability();
        this.getMaxBooking();
    }

    getBookability(){
        this.bookabilityRef.on('value', snapshot => {
            this.setState({bookabilities:snapshot.val()})
        })
    }
    
    getAllBookings(){
        this.bookingsRef.on('value', (snapshot) => {
            this.setState({
                bookings: snapshot.val()
            });
        })  
    }
    getMaxBooking(){
        firebase.database().ref('booker/max_bookings').on('value', snap => {
            this.setState({ max_bookings: snap.val()  });
        })
    }
    
    setMaxBookings(number){
        firebase.database().ref('max_bookings').set(number);
    }


    
    reverseDate(dateObj) {
        return dateObj.split("-").reverse().join("-");
    }
    _handleInputChanges(e) {
        e.persist();
        this.setState({
            [e.target.name]:e.target.value
        });
        this.newBooking[e.target.name] = e.target.value;
            
    }
    
    render() {
        return (
            <div>
                
                <div>
                {(this.props.isAdmin)?
                    <div>
                        <GetBookingsForm
                            bookabilities={this.state.bookabilities} 
                            bookings={this.state.bookings} 
                            reverseDate={this.reverseDate} 
                            _handleInputChanges={this._handleInputChanges}
                        />
                        <SetIndispo
                            isAdmin={this.props.isAdmin}
                            bookabilities={this.state.bookabilities}
                            bookabilityRef={this.bookabilityRef}
                            reverseDate={this.reverseDate}
                            MAX_BOOKINGS={this.state.max_bookings}
                        />
                    </div>:''}
                    <Container>
                        <CreateBooking 
                        isAdmin={this.props.isAdmin}
                        MAX_BOOKINGS={this.state.max_bookings}/>
                    </Container>
                </div>


            </div>
        );
    }
}

export default Booker;


