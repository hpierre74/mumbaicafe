import React, { Component } from "react";
import DatePicker from "material-ui/DatePicker";
import areIntlLocalesSupported from "intl-locales-supported";
import RaisedButton from "material-ui/RaisedButton";
import Dialog from "material-ui/Dialog";
import { cyan500, red500, green500 } from "material-ui/styles/colors";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from "material-ui/Table";
import moment from "moment";
import "moment/locale/fr";
import {
  isLate,
  togglePersonShown,
  getBookingsByDay,
  //countPersonsPerService,
  DeleteBooking
} from "../../Services/BookingService";

let DateTimeFormat;

/**
 * Use the native Intl.DateTimeFormat if available, or a polyfill if not.
 */
if (areIntlLocalesSupported(["fr"])) {
  DateTimeFormat = global.Intl.DateTimeFormat;
} else {
  const IntlPolyfill = require("intl");
  DateTimeFormat = IntlPolyfill.DateTimeFormat;
  require("intl/locale-data/jsonp/fr");
}

const Booking = props => {
  const {  toggleNotePop, notePop, setBookingForDate, toggleDelete, booking } = props;
  return (
    <TableRow
      style={{ 
          backgroundColor: booking.show ? green500 : 'inherit',
          color: (!booking.show && isLate(booking)) ? red500 : 'inherit'
      }}
      key={props.key}
    >
      <TableRowColumn>{booking.lastname} </TableRowColumn>
      <TableRowColumn>{booking.date}</TableRowColumn>
      <TableRowColumn>{booking.time}</TableRowColumn>
      <TableRowColumn>{booking.persons}</TableRowColumn>
      <TableRowColumn>{booking.tel}</TableRowColumn>
      <TableRowColumn style={{display: 'flex', justifyContent:'space-around', alignItems: 'center'}}>
        <i style={{cursor:'pointer',verticalAlign: 'middle'}} className="material-icons" onClick={e => toggleDelete(booking)}>
          delete
        </i>
        <i
          style={{cursor:'pointer',verticalAlign: 'middle'}}
          className="material-icons"
          onClick={e => togglePersonShown(booking, setBookingForDate)}
        >
          check
        </i>
        
        {(booking.note !=='')? //If customer left a comment, Dialog toggle avalaible via Icon
        <div><i 
            onClick={toggleNotePop} 
            className="material-icons"
            style={{cursor:'pointer',verticalAlign: 'middle'}}
        >chat</i>    
        <Dialog
            title={booking.note}
            modal={false}
            open={notePop}
            onRequestClose={toggleNotePop}
            >
            <p>{booking.note}</p>
        </Dialog></div> :''} 
      </TableRowColumn>
    </TableRow>
  );
};

const BookingsTable = props => {
  const { toggleNotePop, notePop, bookings, toggleDelete, setBookingForDate } = props;
  const renderBookings = bookings => {
    return Object.values(bookings).map((booking, index) => {
      return (
        <Booking
          key={index}
          booking={booking}
          toggleDelete={toggleDelete}
          setBookingForDate={setBookingForDate}
          notePop={notePop}
          toggleNotePop={toggleNotePop}
        />
      );
    });
  };
  return (
    <div>
      <Table selectable={false}>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
          enableSelectAll={false}
        >
          <TableRow>
            <TableHeaderColumn>Nom</TableHeaderColumn>
            <TableHeaderColumn>Date</TableHeaderColumn>
            <TableHeaderColumn>Heure</TableHeaderColumn>
            <TableHeaderColumn>Pers.</TableHeaderColumn>
            <TableHeaderColumn>Tél</TableHeaderColumn>
            <TableHeaderColumn>Actions</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody displayRowCheckbox={false}>
          <TableRow>
            <TableRowColumn
              style={{ fontWeight: "bold", color: cyan500 }}
              colSpan="6"
            >
              Lunch / 12h-14h
            </TableRowColumn>
          </TableRow>
          {bookings.lunch ? (
            renderBookings(bookings.lunch)
          ) : (
            <TableRow>
              <TableRowColumn colSpan="6">
                {" "}
                Aucune réservation pour ce service
              </TableRowColumn>
            </TableRow>
          )}
          <TableRow>
            <TableRowColumn
              style={{ fontWeight: "bold", color: cyan500 }}
              colSpan="6"
            >
              Soir 1 / 19h-21h
            </TableRowColumn>
          </TableRow>
          {bookings.dinner1 ? (
            renderBookings(bookings.dinner1)
          ) : (
            <TableRow>
              <TableRowColumn colSpan="6">
                {" "}
                Aucune réservation pour ce service
              </TableRowColumn>
            </TableRow>
          )}
          <TableRow>
            <TableRowColumn
              style={{ fontWeight: "bold", color: cyan500 }}
              colSpan="6"
            >
              Soir 2 / 21h-23h
            </TableRowColumn>
          </TableRow>
          {bookings.dinner2 ? (
            renderBookings(bookings.dinner2)
          ) : (
            <TableRow>
              <TableRowColumn colSpan="6">
                {" "}
                Aucune réservation pour ce service
              </TableRowColumn>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

class BookingManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notePop: false,
      deleteDialog: false,
      bookingTarget: [],
      bookings: [],
      date: null
    };
    this.handleDateChange = this.handleDateChange.bind(this);
    this.toggleDelete = this.toggleDelete.bind(this);
    this.cancelDelete = this.cancelDelete.bind(this);
    this.confirmDelete = this.confirmDelete.bind(this);
    

  }

  toggleNotePop() {
      this.setState({ notePop: !this.state.notePop  });
  }


  confirmDelete() {
    DeleteBooking(this.state.bookingTarget);
    this.setState(
      {
        deleteDialog: false,
        bookingTarget: []
      },
      () => {
        this.setBookingForDate();
      }
    );
  }
  cancelDelete() {
    this.setState({ deleteDialog: false });
  }
  toggleDelete(booking) {
    this.setState({
      deleteDialog: true,
      bookingTarget: booking
    });
  }

  setBookingForDate() {
    getBookingsByDay(moment(this.state.date).format("DD-MM-YYYY"))
      .then(data => {
        this.setState({
          bookings: data !== null ? data : []
        });
      })
      // .then(() => {
      //   console.log(countPersonsPerService(this.state.bookings));
      // });
  }
  handleDateChange = (event, date) => {
    this.setState(
      {
        date: date
      },
      () => {
        this.setBookingForDate();
      }
    );
  };
  disableWeekends(date) {
    return date.getDay() === 0 || date.getDay() === 6;
  }

  render() {
    const actions = [
      <RaisedButton
        label="Annuler"
        onClick={this.cancelDelete}
        //backgroundColor={red500}
      />,
      <RaisedButton
        label="Confirmer la suppression"
        onClick={this.confirmDelete}
        backgroundColor={red500}
      />
    ];
    return (
      <div style={{
            padding: '2.5% 1%',
            border: '1px solid',
            borderRadius: '4px' 
        }}>
        <div>
          <h4>
            {this.state.date !== null
              ? "Réservations du " + moment(this.state.date).format("L")
              : "Sélectionner le jour"}
          </h4>
          <form>
            <DatePicker
              onChange={this.handleDateChange}
              name="date"
              value={this.state.date}
              floatingLabelText="Date"
              DateTimeFormat={DateTimeFormat}
              okLabel="OK"
              cancelLabel="Annuler"
              autoOk={true}
              locale="fr"
              fullWidth={true}
              shouldDisableDate={this.disableWeekends}
            />
            <h6>
              {this.state.date !== null
                ? moment(this.state.date).format("DD-MM-YYYY") +
                  " : " +
                  moment(this.state.date)
                    //.add(1, "days")
                    .fromNow()
                : "Vous n'avez pas sélectionné de date"}
            </h6>
          </form>
        </div>
        <BookingsTable
          setBookingForDate={this.setBookingForDate.bind(this)}
          toggleDelete={this.toggleDelete}
          date={this.state.date}
          bookings={this.state.bookings}
          notePop={this.state.notePop}
          toggleNotePop={this.toggleNotePop.bind(this)}
          
        />
        <Dialog
          title="Confirmer Suppression"
          actions={actions}
          modal={true}
          open={this.state.deleteDialog}
        />
        
      </div>
    );
  }
}

export default BookingManager;
