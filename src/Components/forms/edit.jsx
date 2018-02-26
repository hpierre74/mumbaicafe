
import React from 'react';
import '../../styles/forms/edit.css';
import { Form, FormGroup, Label, Input, Button, Col } from 'reactstrap';
//import Icon from '../utils/icon.jsx';

const Edit = (props) => {
    const { type, update, handleChange, data, field } = props;
    console.log(data);

    
    const makeFormMatchingEntries = (type) => {

        if(type === 'cocktail') {
            return(
                <Col>
                    <FormGroup>
                        <Label htmlFor="cocktail-name-Input">Nom du Cocktail</Label>
                        <Input defaultValue={data.name} onChange={(e) => handleChange(e, 'name')} type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor=""></Label>
                        <Input defaultValue={data.description} onChange={(e) => handleChange(e, 'description')} type="text"/>
                    </FormGroup>
                    <FormGroup>
                        <Label htmlFor=""></Label>
                        <Input defaultValue={data.price} onChange={(e) => handleChange(e, 'price')} type="text"/>
                    </FormGroup>
                    
                </Col>
            );
        
        }

    }

    return (
        <div>
            <Form onSubmit={(e) => update(e, field, data.id)}  >
                
                    {makeFormMatchingEntries(type)}
                    <Button color='warning'>Submit</Button>
                
                
                
            </Form>
        </div>
    );
};

export default Edit;
