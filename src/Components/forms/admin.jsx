import React, { Component } from 'react';

class Admin extends Component {
    render() {
        return (
            <div>
                <h3>admin</h3>
                {this.props.children}
            </div>
        );
    }
}

export default Admin;