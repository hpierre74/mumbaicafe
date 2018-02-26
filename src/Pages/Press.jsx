import React, { Component } from 'react';
import NavComponent from '../Components/header/NavComponent.jsx';
import { Container, Button, Row, Col } from 'reactstrap';


class Press extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }
    }
    render() { 
        return ( 
            <Container>
                <NavComponent />
                <Row>
                    <Col>
                        <div id="TA_cdsratingsonlynarrow888" className="TA_cdsratingsonlynarrow">
                            <ul id="pZw2BkJD4n" className="TA_links OaflSvizW">
                                <li id="MmhRji6zYzy" className="hNqZJisatg">
                                    <a target="_blank" href="https://www.tripadvisor.fr/"><img src="https://www.tripadvisor.fr/img/cdsi/img2/branding/tripadvisor_logo_transp_340x80-18034-2.png" alt="TripAdvisor"/></a>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col>
                        <div id="wpac-google-review"></div>
                    </Col>
                    <Col>
                        <div id="wpac-facebook-review"></div>
                    </Col>
                </Row>

            </Container>
         )
    }
}
 
export default Press;