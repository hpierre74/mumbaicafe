import React, { Component } from "react";
import BookingsTable from "./BookingsTable.jsx";
import {
    Container,
    Row,
    Col,
    Form,
    FormGroup,
    Label,
    Input,
    Button,
    Table
} from "reactstrap";
import moment from "moment";
import "moment/locale/fr";

class GetBookingsForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            requested_bookings: [],
            date: moment(new Date()).format("DD-MM-YYYY"),
            service: "",
            persons: {
                all: "",
                lunch: "",
                dinner1: "",
                dinner2: ""
            },
            week: []
        };
    }

    componentWillMount() {
        !moment(moment(this.state.date).format()).isValid()
            ? this.getBookingsByDate(this.state.date, this.state.service)
            : () => {
                  return;
            };
    }

    _handleSubmit(e) {
        e.preventDefault();
        this.getBookingsByDate(
            this.reverseDate(this.state.date),
            this.state.service
        );
    }

    _handleInputChanges(e) {
        e.persist();
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    getBookingAmountPerDay(date) {
        let amount = 0;
        let lunchAmount = 0;
        let dinner1Amount = 0;
        let dinner2Amount = 0;
        Object.values(this.props.bookings).map((booking, index) => {
            if (booking.date === date) {
                amount = amount + parseInt(booking.persons);
                if (booking.service === "lunch") {
                    lunchAmount = lunchAmount + parseInt(booking.persons);
                } else if (booking.service === "dinner-1") {
                    dinner1Amount = dinner1Amount + parseInt(booking.persons);
                } else if (booking.service === "dinner-2") {
                    dinner2Amount = dinner2Amount + parseInt(booking.persons);
                }
            }
        });
        this.setState({
            persons: {
                all: amount,
                lunch: lunchAmount,
                dinner1: dinner1Amount,
                dinner2: dinner2Amount
            }
        });
    }
    reverseDate(dateObj) {
        return dateObj
            .split("-")
            .reverse()
            .join("-");
    }
    getBookingsByDate(date, service) {
        let theseBookings = [];
        this.getBookingAmountPerDay(date);

        Object.values(this.props.bookings).map((booking, index) => {
            if (
                booking.date === date &&
                (booking.service === service || service === "")
            ) {
                theseBookings = theseBookings.concat(booking);
                return theseBookings;
            }
        });
        this.setState({
            requested_bookings: theseBookings
        });
        return theseBookings;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <div className="panel panel-primary">
                            <h4 className="panel-heading">
                                Réservations du{" "}
                                {moment(
                                    moment(this.state.date).format()
                                ).isValid()
                                    ? this.reverseDate(this.state.date)
                                    : this.state.date}
                            </h4>

                            <Form
                                className="panel-body"
                                onSubmit={e => this._handleSubmit(e)}
                            >
                                <Row>
                                    <Col xs="12" sm="6" md="6">
                                        <FormGroup>
                                            <Label>Date</Label>
                                            <Input
                                                value={this.state.date}
                                                type="date"
                                                name="date"
                                                onChange={e =>
                                                    this._handleInputChanges(e)
                                                }
                                            />
                                        </FormGroup>
                                    </Col>
                                    <Col xs="12" sm="6" md="6">
                                        <FormGroup>
                                            <Label>Service</Label>
                                            <Input
                                                value={this.state.service}
                                                type="select"
                                                name="service"
                                                onChange={e =>
                                                    this._handleInputChanges(e)
                                                }
                                            >
                                                <option value="">Tous</option>
                                                <option value="lunch">
                                                    Midi
                                                </option>
                                                <option value="dinner-1">
                                                    Soir, 1er service
                                                </option>
                                                <option value="dinner-2">
                                                    Soir, 2e service
                                                </option>
                                            </Input>
                                        </FormGroup>
                                    </Col>
                                    <Col style={{ alignSelf: "center" }}>
                                        <Button color="primary">
                                            Rechercher
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <Container fluid>
                                <div>
                                    <Table className="panel panel-primary">
                                        <thead className="panel panel-heading">
                                            <tr>
                                                <th>Midi</th>
                                                <th>Soir 1</th>
                                                <th>Soir 2</th>
                                                <th>Total Jour</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    {this.state.persons.lunch}/20
                                                </td>
                                                <td>
                                                    {this.state.persons.dinner1}/20
                                                </td>
                                                <td>
                                                    {this.state.persons.dinner2}/20
                                                </td>
                                                <td>
                                                    {this.state.persons.all}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </div>
                            </Container>
                            <div>
                                <BookingsTable
                                    bookings={this.state.requested_bookings}
                                />
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default GetBookingsForm;
