import React, { Component } from 'react';
//import {Container} from 'reactstrap';
import '../../../styles/menu/food/food.css';


class Food extends Component {


    render() {
        return(
            <div className='food'>
            
                <div className="buttons-wrapper" >
                    <a className={(this.props.active==="insects")?"active":"default"} onClick={ (e) => this.props._toggleActive('insects','food') } ref='insects' name='insects'>Insectes</a>
                    <a className={(this.props.active==="meal")?"active":"default"} onClick={ (e) => this.props._toggleActive('meal','food') } ref='meal' name='meal'>Restaurant</a>
                    <a className={(this.props.active==="cathering")?"active":"default"} onClick={ (e) => this.props._toggleActive('cathering','food') } ref='cathering' name='cathering'>Traiteur/Entreprise</a>

                </div>
                <div id="foods">
                    {this.props.children}
                </div>
            
            </div>
        );
    }
}
export default Food;