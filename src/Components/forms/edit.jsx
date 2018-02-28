import React from "react";
import "../../styles/forms/edit.css";
import { Form, FormGroup, Label, Input, Button, Col } from "reactstrap";
//import Icon from '../utils/icon.jsx';

const Edit = props => {
  const { type, update, handleChange, data, field, entry } = props;
  console.log(data);

  const makeFormMatchingEntries = type => {
    switch (type) {
      case "NamePrice":
        return (
          <Col>
            <FormGroup>
              <Label htmlFor="name-input">Nom du Produit</Label>
              <Input
                defaultValue={data.name}
                onChange={e => handleChange(e, "name")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price-input">Prix du produit</Label>
              <Input
                defaultValue={data.price}
                onChange={e => handleChange(e, "price")}
                type="text"
              />
            </FormGroup>
          </Col>
        );
        break;
      case "NamePrice2":
        return (
          <Col>
            <FormGroup>
              <Label htmlFor="name-input">Nom du Produit</Label>
              <Input
                defaultValue={data.name}
                onChange={e => handleChange(e, "name")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price-input1">Prix n°1</Label>
              <Input
                defaultValue={data.price}
                onChange={e => handleChange(e, "price1")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price-input2">Prix n°2</Label>
              <Input
                defaultValue={data.price}
                onChange={e => handleChange(e, "price2")}
                type="text"
              />
            </FormGroup>
          </Col>
        );
        break;
      case "NameDescriptionPrice":
        return (
          <Col>
            <FormGroup>
              <Label htmlFor="name-input">Nom</Label>
              <Input
                defaultValue={data.name}
                onChange={e => handleChange(e, "name")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description-input">Description</Label>
              <Input
                defaultValue={data.description}
                onChange={e => handleChange(e, "description")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price-input">Prix</Label>
              <Input
                defaultValue={data.price}
                onChange={e => handleChange(e, "price")}
                type="text"
              />
            </FormGroup>
          </Col>
        );
        break;
      case "NameDescription2Prices":
        return (
          <Col>
            <FormGroup>
              <Label htmlFor="name-input">Nom du Cocktail</Label>
              <Input
                defaultValue={data.name}
                onChange={e => handleChange(e, "name")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="description-input" />
              <Input
                defaultValue={data.description}
                onChange={e => handleChange(e, "description")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price-input1">Prix n°1</Label>
              <Input
                defaultValue={data.price1}
                onChange={e => handleChange(e, "price1")}
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <Label htmlFor="price-input1">Prix n°2</Label>
              <Input
                defaultValue={data.price2}
                onChange={e => handleChange(e, "price2")}
                type="text"
              />
            </FormGroup>
          </Col>
        );
        break;
      case "singleText":
        return (
          <Col>
            <FormGroup>
              <Label htmlFor="name-input" />
              <Input
                defaultValue={data.name}
                onChange={e => handleChange(e, "name")}
                type="text"
              />
            </FormGroup>
          </Col>
        );
        break;

      default:
        break;
    }
  };

  return (
    <div>
      <Form onSubmit={e => update(e, field, entry)}>
        {makeFormMatchingEntries(type)}
        <Button color="warning">Submit</Button>
      </Form>
    </div>
  );
};

export default Edit;
