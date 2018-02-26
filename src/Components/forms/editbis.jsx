import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../../firebase.conf.js';

class Editbis extends Component {
    constructor(props) {
        super(props);
        this.state = {
            product:''
        }
        this.handleChange = this.handleChange.bind(this);
        this.update = this.update.bind(this);
    }
    thenState() {
        console.log(this.state);
    }
    componentWillMount() {
        this.setState({
            product: this.props.data
        });
    }
    handleChange(e) {
        e.persist();
        this.setState((prevState) => {
            prevState.product[e.target.name] = e.target.value
        });
    }

    update(e, category, path, entry){
        e.preventDefault();
        firebase.database().ref(category).child(path).update({
            [entry]:this.state.product
        })
        .then((success) => {
            
        })
        .catch((error) => {
            alert('not updated');
        });
        
    }
    componentDidUpdate(prevProps, prevState) {
        this.thenState();
    }
    
    makeFormMatchingData() {
        return Object.keys(this.props.data).map((prop,index) => {
            return(
                <div key={index}>
                    <label htmlFor={prop}>{prop}</label>
                    <input type="text" name={prop} onChange={(e) => this.handleChange(e)} value={this.state.product[prop]}/>
                </div>
            )
        });
    }
    
    componentDidUpdate(prevProps, prevState) {
        //console.log(this);
    }
    
    render() {
        return (
            <div>
                <h4>Editez le contenu</h4>
                <form onSubmit={(e) => this.update(e, this.props.category, this.props.path, this.props.entry)} >
                    {this.makeFormMatchingData()}
                    <input value='submit' type="submit"/>
                </form>
            </div>
        );
    }
}


export default Editbis;