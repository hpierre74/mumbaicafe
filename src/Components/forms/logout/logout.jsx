import React from 'react';
import '../../../styles/forms/logout.css';
import {Button} from 'reactstrap';

const Logout = (props) => {
    const { logout } = props;
    return (
        <div className='logout'>
            <Button color="danger" onClick={(e) => logout(e)}>Logout</Button>
        </div>
    );
};

export default Logout;