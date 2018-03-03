import React, { Component } from 'react';
import '../../styles/presentation/presentation.css';
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
                    <Edit isAdmin={this.props.isAdmin}
                        type='singleText'
                        field='presentation'
                        entry='concept'
                        data={this.props.presentation.concept}
                    />
                    
                    <Button size="sm" outline onClick={this.toggle} style={{ marginBottom: '1rem' }}>En Savoir Plus</Button>
                    <Collapse isOpen={this.state.collapse}>
                        <Container>
                            <Row>
                                <Col>
                                    <div>
                                        <div>
                                            <p>{this.props.presentation.food}</p>
                                            <Edit isAdmin={this.props.isAdmin}
                                                type='singleText'
                                                field='presentation'
                                                entry='food'
                                                data={this.props.presentation.food}
                                            />                    
                                        </div>
                                        <div>
                                            <p>{this.props.presentation.tapas}</p>
                                            <Edit isAdmin={this.props.isAdmin}
                                                type='singleText'
                                                field='presentation'
                                                entry='tapas'
                                                data={this.props.presentation.tapas}
                                            />
                                        </div>
                                        <div>
                                            <p>{this.props.presentation.bar}</p>
                                            <Edit isAdmin={this.props.isAdmin}
                                                type='singleText'
                                                field='presentation'
                                                entry='bar'
                                                data={this.props.presentation.bar}
                                            />
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

