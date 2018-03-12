import React, { Component } from "react";
import TextField from "material-ui/TextField";
import DatePicker from "material-ui/DatePicker";
import areIntlLocalesSupported from "intl-locales-supported";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import Divider from "material-ui/Divider";
import RaisedButton from "material-ui/RaisedButton";
import CircularProgress from 'material-ui/CircularProgress';
import Dialog from 'material-ui/Dialog';
import {red500, green500} from 'material-ui/styles/colors';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
import moment from "moment";
import "moment/locale/fr";
import Snacks from './snacks'
import { isBookingValid, isTableAvalaible, SaveBooking } from "../../Services/BookingService";

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

class BookerForm extends Component {
    constructor(props) {
        super(props);
        this.newBookingData = [];
        this.newBookingKey = '';
        this.state = {
            snackOpen:false,
            snackText:'',
            booked:false,
            loading:false,
            firstname: "",
            lastname: "",
            tel: "",
            email: "",
            key: "",
            date: null,
            datetime: "",
            time: "",
            timestamp: "",
            service: "",
            persons: "",
            note: ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleDateChange = this.handleDateChange.bind(this);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.createBooking = this.createBooking.bind(this);
        this.cancelBooking = this.cancelBooking.bind(this);
        this.confirmBooking = this.confirmBooking.bind(this);
    }


    toggle(state) {
        this.setState({ [state]: !this.state[state]  });
    }

    handleInputChange(e, key) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    handleDateChange = (event, date) => {
        this.setState({
            date: date
        });
    };
    handleSelectChange = (event, index, value) => {
        this.setState({ time: value });
    };

    createBooking() {
        this.setState({ loading: true  });
        const {
            firstname,
            lastname,
            tel,
            email,
            date,
            time,
            persons,
            note
        } = this.state;

        this.newBookingData = {
            firstname: firstname,
            lastname: lastname,
            tel: tel,
            email: email,
            key: "",
            date: moment(date).format("DD-MM-YYYY"),
            datetime: moment().format(
                moment(date).format("DD-MM-YYYY") + " " + time,
                "DD-MM-YYYY HH:mm"
            ),
            time: time,
            timestamp: moment().format(),
            service:
                time.substr(0, 2) < 14
                    ? "lunch"
                    : time.substr(0, 2) < 20 ? "dinner1" : "dinner2",
            persons: parseInt(persons,10),
            note: note,
            show: false
        };        
        isTableAvalaible(
            this.newBookingData.date,
            this.newBookingData.service, 
            this.newBookingData.persons
        )
        .then(response => {
            if(response) {
                this.setState({
                    loading:false,
                    booked : true
                })
            } else {
                this.setState({ 
                    loading:false,
                    snackOpen: true,
                    snackText: "Malheureusement, nous ne disposons pas d'assez de place pour "+this.newBookingData.persons
                });
            }
            
        })
        .catch(error => {
            console.log(error);
        })
    }
    disableWeekends(date) {
        return date.getDay() === 0 || date.getDay() === 6;
    }
    confirmBooking() {
        SaveBooking(this.newBookingData);
        this.setState({
            booked:false,
            firstname: "",
            lastname: "",
            tel: "",
            email: "",
            key: "",
            date: null,
            datetime: "",
            time: "",
            timestamp: "",
            service: "",
            persons: "",
            note: "",
            snackOpen:true,
            snackText:"Réservation effectuée, à bientôt "+this.state.firstname
        });
        this.newBookingData = [];
    }
    cancelBooking() {      
        this.setState({
            booked: false,
            loading:false,
            key: "",
            date: null,
            datetime: "",
            time: "",
            timestamp: "",
            service: "",
            persons: "",
            note: ""
        });
        this.newBookingData = [];
    }
    render() {
        const actions = [
            <RaisedButton
              label="Annuler la réservation"
              onClick={this.cancelBooking}
              backgroundColor={red500}
            />,
            <RaisedButton
              label="Confirmer la réservation"
              onClick={this.confirmBooking}
              backgroundColor={green500}
            />,
          ];
        const styles = {
            col: {
                margin: "0 auto",
                width: window.innerWidth > 700 ? "45%" : "100%",
                color: "white",
                textAlign: 'left'
            },
            layout: {
                width: window.innerWidth > 700 ? "80%" : "95%",
                margin: "0 auto",
                display: window.innerWidth > 700 ? "flex" : "block"
            }
        };
        const {
            firstname,
            lastname,
            tel,
            email,
            date,
            time,
            persons,
            note
        } = this.state;
        return (
            <div className='panel panel-booker' style={{ background: "transparent", borderRadius:'4px' }}>
                <h2 style={{padding: '2.5%'}}>Réserver une table</h2>
                <form style={{ padding: "2.5%" }}>
                    <div style={styles.layout}>
                        <TextField
                            onChange={e => this.handleInputChange(e)}
                            name="firstname"
                            floatingLabelText="Votre Prénom"
                            value={firstname}
                            style={styles.col}
                        />
                        <TextField
                            onChange={e => this.handleInputChange(e)}
                            name="lastname"
                            floatingLabelText="Votre Nom"
                            value={lastname}
                            style={styles.col}
                        />
                    </div>
                    <div style={styles.layout}>
                        <TextField
                            onChange={e => this.handleInputChange(e)}
                            name="tel"
                            type="tel"
                            floatingLabelText="Votre téléphone"
                            hintText="Add country code if foreigner"
                            value={tel}
                            style={styles.col}
                            errorText={
                                tel.length < 10 && tel !== ""
                                    ? "Un numéro comprend 10 chiffres minimum."
                                    : ""
                            }
                        />
                        <TextField
                            onChange={e => this.handleInputChange(e)}
                            name="email"
                            floatingLabelText="Votre email"
                            value={email}
                            type="email"
                            style={styles.col}
                            
                        />
                    </div>
                    <div style={styles.layout}>
                        <DatePicker
                            onChange={this.handleDateChange}
                            name="date"
                            value={date}
                            floatingLabelText="Date"
                            DateTimeFormat={DateTimeFormat}
                            okLabel="OK"
                            cancelLabel="Annuler"
                            locale="fr"
                            style={styles.col}
                            fullWidth={true}
                            autoOk={true}
                            shouldDisableDate={this.disableWeekends}
                            
                        />
                        {moment(this.state.date).weekday() !== 4 ?
                        <SelectField
                            floatingLabelText="Heure"
                            value={time}
                            onChange={this.handleSelectChange}
                            name="time"
                            style={styles.col}
                        >
                            <MenuItem value={""} />
                            <MenuItem value={"12:00"} primaryText="12:00" />
                            <MenuItem value={"12:30"} primaryText="12:30" />
                            <MenuItem value={"13:00"} primaryText="13:00" />
                            <MenuItem value={"13:30"} primaryText="13:30" />
                            
                            <Divider />
                            <MenuItem value={"19:00"} primaryText="19:00" />
                            <MenuItem value={"19:30"} primaryText="19:30" />
                            <Divider />
                            <MenuItem value={"21:30"} primaryText="21:30" />
                            <MenuItem value={"22:00"} primaryText="22:00" />
                            <MenuItem value={"22:30"} primaryText="22:30" />
                        
                        </SelectField>
                        :
                        <SelectField
                            floatingLabelText="Heure de réservation"
                            value={time}
                            onChange={this.handleSelectChange}
                            name="time"
                            style={styles.col}
                        >
                            <MenuItem value={""} />
                            <MenuItem value={"12:00"} primaryText="12:00" />
                            <MenuItem value={"12:30"} primaryText="12:30" />
                            <MenuItem value={"13:00"} primaryText="13:00" />
                            <MenuItem value={"13:30"} primaryText="13:30" />
                        </SelectField>
                        }

                    </div>
                    <div style={styles.layout}>
                        <TextField
                            onChange={e => this.handleInputChange(e)}
                            name="persons"
                            type="number"
                            floatingLabelText="Nombre de personnes"
                            value={persons}
                            style={styles.col}
                            errorText={
                                persons > 15 && persons !== ""
                                    ? "Réservations limitées à 15 personnes maximum en ligne, appelez le restaurant pour un plus grand groupe."
                                    : ""
                            }
                        />
                        <TextField
                            onChange={e => this.handleInputChange(e)}
                            name="note"
                            floatingLabelText="Allergies...(optionnel)"
                            value={note}
                            type="text"
                            style={styles.col}
                            errorText={
                                note.length > 100
                                    ? "Une note ne peut excéder 100 caractères, pour une demande précise veuillez nous contacter par téléphone"
                                    : ""
                            }
                        />
                    </div>
                    <div style={{ textAlign: "center", margin: "2.5%" }}>
                        {!this.state.loading?
                        <RaisedButton
                            disabled={
                                !isBookingValid(this.state) ? true : false
                            }
                            onClick={this.createBooking}
                            label="Enregistrer la réservation"
                        />:<CircularProgress />
                    }
                    </div>
                </form>
                
                <Dialog
                    title="Votre réservation"
                    actions={actions}
                    modal={true}
                    open={this.state.booked}
                >
                    <Table selectable={false}>
                        <TableHeader 
                            displaySelectAll={false}
                            adjustForCheckbox={false}
                            enableSelectAll={false}
                        >
                        <TableRow>
                            <TableHeaderColumn>Prénom : {this.state.firstname}</TableHeaderColumn>
                            <TableHeaderColumn>Nom : {this.state.lastname}</TableHeaderColumn>
                        </TableRow>
                        </TableHeader>
                        <TableBody displayRowCheckbox={false}>
                        <TableRow>
                            <TableRowColumn>Téléphone : {this.state.tel}</TableRowColumn>
                            <TableRowColumn>Email : {this.state.email}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Date de réservation : {moment(this.state.date).format('L')}</TableRowColumn>
                            <TableRowColumn>Heure de réservation : {this.state.time}</TableRowColumn>
                        </TableRow>
                        <TableRow>
                            <TableRowColumn>Nombre de personnes : {this.state.persons}</TableRowColumn>
                            <TableRowColumn>Note : {this.state.note}</TableRowColumn>
                        </TableRow>
                        </TableBody>
                    </Table>
                </Dialog>
                <Snacks open={this.state.snackOpen} toggle={this.toggle.bind(this)} message={this.state.snackText} />

            </div>
        );
    }
}

export default BookerForm;
