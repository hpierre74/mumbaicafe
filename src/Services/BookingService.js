import moment from "moment";
import "moment/locale/fr";
import Firebase from "./firebase";

export const getBookings = () => {
  return Firebase.Get("bookerV2/v2/bookings").then(data => {
    return data;
  });
};
export const getBookingsByDay = date => {
  return Firebase.Get("bookerV2/v2/calendar/" + date)
    .then(data => {
      return data;
    })
    .catch(error => {
      console.log("null data", error);
      return;
    });
};
export const countPersonsPerService = bookings => {
  let allDayBookingsAmount = {};
  let persons = 0;
  // eslint-disable-next-line
  Object.keys(bookings).map((service, index) => {
    // eslint-disable-next-line
    Object.values(bookings[service]).map((booking, index) => {
      persons = persons + booking.persons;
    });
    allDayBookingsAmount[service] = persons;
    persons = 0;
  });
  return allDayBookingsAmount;
};
export const getPersonAmountForService = (date, service) => {
  let personAmount = 0;
  return getBookings().then(data => {
    // eslint-disable-next-line
    Object.values(data).map(booking => {
      if (booking.date === date && booking.service === service) {
        personAmount = personAmount + booking.persons;
      }
    });
    console.log(personAmount);
    return personAmount;
  });
};
// eslint-disable-next-line
const getMaxBookingAmount = () => {
  Firebase.Get("bookerV2/v2/maxBookingAmount").then(value => {
    return value;
  });
};

export const isTableAvalaible = (date, service, persons) => {
  let max = 24;
  return getPersonAmountForService(date, service).then(value => {
    if (max - value - persons >= 0) {
      return true;
    } else {
      return false;
    }
  });
};

export const isLate = (booking) => {

    if(moment(booking.date+ ' ' +booking.time,'DD-MM-YYYY HH:mm').isBefore( moment() )) {
        return true;
    } else {return false}
    

}

export const isBookingValid = booking => {

  //isBookable(booking.date, booking.service)
  // let validDate = moment(booking.date)
  //     .hours(booking.time.substr(0, 2), "HH") //Get hours from booking time input
  //     .minutes(booking.time.substr(3, 2), "mm"); //Get minutes from booking time input

  //at 12h00, forbid book for today's lunch
  if (
    booking.firstname === "" ||
    booking.lastname === "" ||
    booking.tel === "" ||
    booking.email === "" ||
    booking.persons === "" ||
    booking.date === null ||
    booking.time === ""
  ) {
    //console.log("fill form");
    return false;
  }
  if (moment(booking.date).weekday() === 4 && booking.time.substr(0, 2) > 14) {
    return false; //Forbid Friday dinner bookings
  }
  if (
    booking.time.substr(0, 2) < 14 &&
    moment().isAfter(moment(booking.date).hours(12, "HH"))
  ) {
    console.log(
      "lunch Heure limite de réservation atteinte, il est possible que des tables soient libres sur place"
    );
    return false;
  } else if (
    //at 18:30, forbid book for today's dinner
    booking.time.substr(0, 2) >= 19 &&
    moment().isAfter(
      moment(booking.date)
        .hours(18, "HH")
        .minutes(30, "mm")
    )
  ) {
    console.log(
      "dinner Heure limite de réservation atteinte, il est possible que des tables soient libres sur place"
    );
    return false;
  } else if (booking.firstname.length < 2 || booking.lastname.length < 2) {
    console.log("name < 2 !"); //Names length can't be less than 2 characters
    return false;
  } else if (booking.tel.length < 10 || booking.tel.length > 16) {
    console.log("tel length"); //Telephone number string length has to be between 10 or 16
    return false;
  } else if (
    booking.email.search("@") === -1 ||
    booking.email.search(".") === -1
  ) {
    console.log("email format"); //Email must contains '@' and '.' to be valid
    return false;
  } else if (booking.persons > 15) {
    console.log("15 personnes maximum"); //Restrict maximum guests to 15 per booking
    return false;
  } else return true;
};

export const SaveBooking = newBooking => {
  newBooking.key = Firebase.getNewKey("bookerV2/v2/bookings");
  let updates = {};
  updates[
    "/calendar/" +
      newBooking.date +
      "/" +
      newBooking.service +
      "/" +
      newBooking.key
  ] = newBooking;
  updates["/bookings/" + newBooking.key] = newBooking;
  updates["/contacts/" + newBooking.lastname + "-" + newBooking.tel] = {
    name: newBooking.firstname + " " + newBooking.lastname,
    tel: newBooking.tel,
    email: newBooking.email
  };
  Firebase.Update("bookerV2/v2/", updates)
    .then(success => {
      console.log("Updated");
    })
    .catch(error => {
      console.log("Update failed");
    });
};

export const DeleteBooking = booking => {
  let updates = {};
  updates[
    "/calendar/" + booking.date + "/" + booking.service + "/" + booking.key
  ] = null;
  updates["/bookings/" + booking.key] = null;

  return Firebase.Update("bookerV2/v2/", updates)
    .then(success => {
      console.log("Booking deleted");
      return true;
    })
    .catch(error => {
      console.log("Booking deletion failed");
      return false;
    });
};

export const togglePersonShown = (booking,callback) => {
  return Firebase.Update(
    "bookerV2/v2/calendar/" +
      booking.date +
      "/" +
      booking.service +
      "/" +
      booking.key,
    { show:!booking.show }
  ).then(
      callback()
  )
};
