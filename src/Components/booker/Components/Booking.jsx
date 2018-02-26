import React from 'react'

const Booking = (props) => {
    const { arrived, booking, index } = props;
        return (
            <tr key={index}>
                <th scope="row">{index+1}</th>
        <td> {(arrived)?<i className="far fa-check-circle text-success"></i>:<i className=" text-info far fa-clock"></i>}</td>
                <td> { booking.name } </td>
                <td> { booking.persons } </td>
                <td> { booking.date } </td>
                <td> { booking.time } </td>                  
                <td> { booking.tel } </td>
                {/* <td> { booking.email } </td> */}
                <td> { booking.note } </td>
                <td> {<i className="text-danger far fa-times-circle"></i>}</td>
            </tr>
        )
    }

export default Booking
//style={(arrived)?{backgroundColor:'green'}:{}}