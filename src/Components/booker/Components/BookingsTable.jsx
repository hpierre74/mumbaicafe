import React from 'react';
import Booking from './Booking.jsx';
import { Container, Table } from 'reactstrap';

const BookingsTable = (props) => {
    const { title, bookings } = props;
    const renderBookings = (bookings) => {
        return Object.values(bookings).map((booking, index) => {
            return (
                <Booking  key={index} index={index} booking={booking} />
            )
        })
    }
       return (
        <div>
        <Container fluid>
            <div className={(title)?"panel panel-primary":""}>
                <h1 className={(title)?'panel-heading':""}>{title}</h1>
                <Table responsive striped >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Show</th>
                            <th>Nom</th>
                            <th>Couverts</th>
                            <th>Date</th>
                            <th>Heure</th>
                            <th>Téléphone</th>
                            {/* <th>Email</th> */}
                            <th>Note</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                    {renderBookings(bookings)}
                    </tbody>
                </Table>
            </div>
        </Container>
        </div>
    )
}

export default BookingsTable