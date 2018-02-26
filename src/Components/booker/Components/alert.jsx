import React from 'react';
import { Alert } from 'reactstrap';


const Alerts = (props) => {
    const { type, content } = props;
    return(
        <Alert color={(type === "success")?"success":"danger"}>
            {content}
        </Alert>
    )
}
 
export default Alerts;