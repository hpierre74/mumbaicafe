import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col, Collapse } from "reactstrap";
import FirebaseService from '../../Services/firebase.js';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            active:false
        }
        this.setStateCallback = this.setStateCallback.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSingleTextState = this.handleSingleTextState.bind(this);
    }

    componentWillMount() {
        this.setState({ data: this.props.data  });
    }
    setStateCallback(name,data) {
        this.setState({ [name]: data  });
    }
    
    toggle(){
        this.setState({ active: !this.state.active });
    }

    handleChange(e, key) {
        e.persist();
        this.setState( prevState => {
            prevState.data[key] = e.target.value
        });
    }

    handleSingleTextState(e) {
        e.persist();
        this.setState({ data: e.target.value  });
    } 

    update(e){
        e.preventDefault();
        FirebaseService.Update(this.props.field, this.props.entry, this.state.data);
    }


    makeFormMatchingEntries(type) {
    switch (type) {
        case "NamePrice":
        return (
            <Col>
            <FormGroup>
                <Label htmlFor="name-input">Nom du Produit</Label>
                <Input
                defaultValue={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input">Prix du produit</Label>
                <Input
                defaultValue={this.state.data.price}
                onChange={e => this.handleChange(e, "price")}
                type="text"
                />
            </FormGroup>
            </Col>
        );
        case "NamePrice2":
        return (
            <Col>
            <FormGroup>
                <Label htmlFor="name-input">Nom du Produit</Label>
                <Input
                defaultValue={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input1">Prix n°1</Label>
                <Input
                defaultValue={this.state.data.price1}
                onChange={e => this.handleChange(e, "price1")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input2">Prix n°2</Label>
                <Input
                defaultValue={this.state.data.price2}
                onChange={e => this.handleChange(e, "price2")}
                type="text"
                />
            </FormGroup>
            </Col>
        );
        case "NameDescriptionPrice":
        return (
            <Col>
            <FormGroup>
                <Label htmlFor="name-input">Nom du produit</Label>
                <Input
                defaultValue={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description-input">Description</Label>
                <Input
                defaultValue={this.state.data.description}
                onChange={e => this.handleChange(e, "description")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input">Prix</Label>
                <Input
                defaultValue={this.state.data.price}
                onChange={e => this.handleChange(e, "price")}
                type="text"
                />
            </FormGroup>
            </Col>
        );
        case "NameDescription2Prices":
        return (
            <Col>
            <FormGroup>
                <Label htmlFor="name-input">Nom du Produit</Label>
                <Input
                defaultValue={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description-input" />
                <Input
                defaultValue={this.state.data.description}
                onChange={e => this.handleChange(e, "description")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input1">Prix n°1</Label>
                <Input
                defaultValue={this.state.data.price1}
                onChange={e => this.handleChange(e, "price1")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input1">Prix n°2</Label>
                <Input
                defaultValue={this.state.data.price2}
                onChange={e => this.handleChange(e, "price2")}
                type="text"
                />
            </FormGroup>
            </Col>
        );
        case "singleText":
        return (
            <Col>
            <FormGroup>
                <Label htmlFor="name-input" />
                <Input
                defaultValue={this.state.data}
                onChange={e => this.handleSingleTextState(e)}
                type="text"
                />
            </FormGroup>
            </Col>
        );

        default:
        break;
    
    };

}
    render() {
        return (
            <div>
                {(this.props.isAdmin && this.props.data.name)?
                <div>
                <Collapse className='clearfix' isOpen={!this.state.active}>
                    <Button 
                        className='float-right'
                        onClick={this.toggle.bind(this)}
                        color='light' size='sm'
                        >
                        Edit
                    </Button>
                </Collapse>
                <Collapse className='clearfix' isOpen={this.state.active}>
                    <Form onSubmit={e => this.update(e, this.props.field, this.props.entry)}>
                        {(this.state.data !==[])?this.makeFormMatchingEntries(this.props.type):''}
                        <Button color="warning">Enregistrer les modifications</Button>
                    </Form>
                    <Button className='float-right' onClick={this.toggle.bind(this)} color='light' size='sm'>Close Edit</Button>
                </Collapse>
                </div>
                :''}
    
            </div>
        );
    };
}
export default Edit;
        