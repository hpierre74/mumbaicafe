import React, { Component } from 'react';
import { Button, Form, FormGroup, Label, Input, Row, Col, Container } from 'reactstrap';
//import '../../../styles/forms/login.css';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password:'',
            email:''

        }
    }
    _handleEmailChange(e) {
        this.setState({
            email:e.target.value
        });
    }
    _handlePasswordChange(e) {
        this.setState({
            password:e.target.value
        });
    }
    render() {
        return (
            <div className='login'>
            <Container>
                <Row>
                    <Col>
                        <div style={{width:'75%',margin:'2.5% auto'}} className="panel panel-primary">
                            <h4 className='panel-heading'>Authentification Admin</h4>                            
                            <Form className="panel-body" onSubmit={(e) => this.props.login(e,this.state.email,this.state.password)}>
                                <Row>
                                    <Col sm="12" md="12" xs="12">
                                        <FormGroup>
                                            <Label for="AdminEmail">Email</Label>
                                            <Input type="email" id="AdminEmail" onChange={(e) => this._handleEmailChange(e)} name="email" value={this.state.email} />
                                        </FormGroup>
                                    </Col>
                                    <Col sm="12" md="12" xs="12">
                                        <FormGroup>
                                            <Label for="AdminPassword">Password</Label>
                                            <Input type="password" id="AdminPassword" onChange={(e) => this._handlePasswordChange(e)} name="password" value={this.state.password}/>
                                        </FormGroup>
                                    </Col>
                                </Row>  
                                <Button color="success">Login</Button>                         
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
            </div>
        );
    }
}

export default Login;