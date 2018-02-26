import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../../firebase.conf.js';

class Product {
    constructor(product) {
        this.name = product.name;
        this.description = product.description;
        this.price = product.price;
        this.price2cl = product.price2cl;
        this.price4cl = product.price4cl;  
    }
    getTemplate(){
        return(
            <div>
                <h3>{this.name}</h3>
                {(this.from!==undefined)?<h5>france</h5>:null}
                <p> {this.description} </p>
                <div>

                </div>
            </div>
        )
    }
}


class Create extends Component {
    constructor(props) {
        super(props);
        this.state = {
            create:[]
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.prepareState = this.prepareState.bind(this);
    }
    
    componentWillMount() {
        this.prepareState();
    }
    
    prepareState() {
        return Object.keys(this.props.products[1]).map((prop,index) => {            
            return this.setState((prevState) => {
                prevState.create[prop] = ''
            });
        });
        console.log(Create);
    }
    
    handleInputChange(e) {
        e.persist();
        this.setState((prevState) => {
            prevState.create[e.target.name] = e.target.value
        });    
    }
    
    createData(e, category, path) {
        e.preventDefault();
        firebase.database().ref(category+'/'+path).set(this.state.create)
        .then((success) => {
            alert('success');
            console.log(success);
        })
        .catch((error) => {
            alert('create failed')
        })
    }

    makeFormMatchData() {
        return Object.keys(this.props.products[1]).map((prop,index) => {
            return(
                <div className='create-input-container' key={index}>
                    <label htmlFor={prop}>{prop}</label>
                    <input type="text" name={prop} onChange={(e) => this.handleInputChange(e)} value={this.state.create[prop]}/>
                </div>
            )
        })
    }

    
    render() {
        let test = new Product('test','lorem ipsum', 5, 'india');
        
        return (
            <div className='create'>
                <h4>Create</h4>
                <form >
                {this.makeFormMatchData()}
                <span onClick={(e) => this.createData(e, this.props.category, this.props.path)}>SUBMIT</span>
                </form>
                {test.getTemplate()}
            </div>
        );
    }
};

export default Create;