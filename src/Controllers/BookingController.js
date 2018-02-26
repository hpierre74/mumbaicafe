import FirebaseService from '../Services/firebase.js';


class BookingController {
    constructor() {
        this.bookings = FirebaseService.get('booker/bookings');
        this.max_bookings = FirebaseService.get('booker/max_bookings');
    }
    static getAllBookings() {
        this.bookings = FirebaseService.get('booker/bookings');
        return this.bookings;
    }
    // booker/bookings/{key}
    static getBooking(bookingRef) {
        this.booking = FirebaseService.get(bookingRef);
        return this.booking;
    }
    
    static setBooking(booking) {
        this.bookings = this.getAllBookings();
        let verifyServiceBookability = () => {
            //let max = 20;
            let current = 0;
            this.bookings.forEach(booking_item => {
                if(booking.date === booking_item.date && booking.service === booking_item.service) {
                    curent = current + booking_item.persons;
                    if( (booking.persons + current) > this.max_bookings) {
                        return; //false ?
                    }
                }
            });
        }
        let restrictLateBookings = () => {

        }
        
        return FirebaseService.set(booking);
    }
    updateBooking(booking) {
        return FirebaseService.update(booking)
    }
    deleteBooking(bookingRef) {
        return FirebaseService.delete(bookingRef);
    }
}