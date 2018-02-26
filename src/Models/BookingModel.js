class BookingModel {
    constructor({BookingModel}) {
      const { name, time, tel, date, service, bookStamp, email } = BookingModel;
      this.getName = (name) => {
        return this.name = name;
      }
      this.getTel = (tel) => {
        return this.tel = tel;

      }
      this.getEmail = (email) => {
        return this.email = email;
      }
      this.date = date;
      this.time = time;
      this.service = service;
    }

    
}
export default BookingModel