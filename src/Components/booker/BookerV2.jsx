import React, { Component } from 'react';
import './booker.css';
import { Container } from 'reactstrap';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';



 


class BookerV2 extends Component {
    
    render() {
        return (
            <div>
                <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
                    <Container>
                        {this.props.children}
                    </Container>
                </MuiThemeProvider>
            </div>
        );
    }
}

export default BookerV2;


