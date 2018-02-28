import React, { Component } from 'react';
import '../../styles/presentation/presentation.css';
import AdminInterface from '../forms/AdminInterface.jsx';
import Edit from '../admin/Edit';
import { Container, Col, Row, Button, Collapse } from 'reactstrap';

class Presentation extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: false };
    }
    
    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }


    render() {
        return (
            <Container className="presentation">

                {(this.props.presentation !==undefined)?  
                <div>
                    <p>{this.props.presentation.concept}</p>
                    <Edit 
                        type='singleText'
                        field='presentation'
                        entry='concept'
                        data={this.props.presentation.concept}
                    />
                    {(this.props.isAdmin)?<AdminInterface
                        data={this.props.presentation.concept}
                        entry="concept"
                        field="presentation"
                    />:''}
                    <Button size="sm" outline onClick={this.toggle} style={{ marginBottom: '1rem' }}>En Savoir Plus</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Container>
                            <Row>
                                <Col>
                                    <div>
                                        <div>
                                            <p>{this.props.presentation.food}</p>
                                            {(this.props.isAdmin)?<AdminInterface
                                                data={this.props.presentation.food}
                                                entry="food"
                                                field="/presentation"
                                            />    :''}                        
                                        </div>
                                        <div>
                                            <p>{this.props.presentation.tapas}</p>
                                            {(this.props.isAdmin)?<AdminInterface
                                                data={this.props.presentation.tapas}
                                                entry="tapas"
                                                field="/presentation"
                                            />:''}
                                        </div>
                                        <div>
                                            <p>{this.props.presentation.bar}</p>
                                            {(this.props.isAdmin)?<AdminInterface
                                                data={this.props.presentation.bar}
                                                entry="bar"
                                                field="/presentation"
                                            />:''}
                                        </div>
                                    </div>                                    
                                </Col>
                            </Row>
                        </Container>
                    </Collapse>                        
                </div>:''}         
            </Container>
        );
    }
}
export default Presentation;

