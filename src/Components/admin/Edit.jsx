import React, { Component } from 'react';
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
import FirebaseService from '../../Services/firebase.js';

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            data:[],
            hydrated:false
        }
        this.setStateCallback = this.setStateCallback.bind(this);
    }

    setStateCallback(name,data) {
        this.setState({ [name]: data  });
    }

    handleChange(e, key) {
        e.persist();
        this.setState( prevState => {
            prevState.data[key] = e.target.value
        });
    }
    componentWillMount() {
        (this.state.data.name === undefined)?
            FirebaseService.Get(
                this.props.field +'/'+ this.props.entry,
                this.setStateCallback)
            :
                ()=> {return;}
            ;
    }

    // componentWillReceiveProps(nextProps) {
    //     this.setState({ 
    //         data: nextProps.data,
    //         hydrated:true
    //     });
    // }
    componentDidUpdate(prevProps, prevState) {
        console.log(this);
    }
    update(e){
        e.preventDefault();
        console.log(this);
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
                value={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input">Prix du produit</Label>
                <Input
                value={this.state.data.price}
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
                value={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input1">Prix n°1</Label>
                <Input
                value={this.state.data.price}
                onChange={e => this.handleChange(e, "price1")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input2">Prix n°2</Label>
                <Input
                value={this.state.data.price}
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
                <Label htmlFor="name-input">Nom</Label>
                <Input
                value={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description-input">Description</Label>
                <Input
                value={this.state.data.description}
                onChange={e => this.handleChange(e, "description")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input">Prix</Label>
                <Input
                value={this.state.data.price}
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
                <Label htmlFor="name-input">Nom du Cocktail</Label>
                <Input
                value={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="description-input" />
                <Input
                value={this.state.data.description}
                onChange={e => this.handleChange(e, "description")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input1">Prix n°1</Label>
                <Input
                value={this.state.data.price1}
                onChange={e => this.handleChange(e, "price1")}
                type="text"
                />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="price-input1">Prix n°2</Label>
                <Input
                value={this.state.data.price2}
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
                value={this.state.data.name}
                onChange={e => this.handleChange(e, "name")}
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
            <Form onSubmit={e => this.update(e, this.props.field, this.props.entry)}>
                {this.makeFormMatchingEntries(this.props.type)}
                <Button color="warning">Submit</Button>
            </Form>
        </div>
        );
    };
}
export default Edit;
        