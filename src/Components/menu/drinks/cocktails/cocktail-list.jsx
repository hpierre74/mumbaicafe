import React, { Component } from 'react';
import '../../../../styles/menu/drinks/cocktails/cocktail-list.css';
import AdminInterface from '../../../forms/AdminInterface.jsx';

import { Cocktail } from './cocktail.jsx';






class CocktailList extends Component {
    constructor(props){
        super(props);
        this.state = {
            active:false
        }

    }
    
    
    
    renderCocktails() {
        return  Object.values(this.props.data[this.props.spiritUsed]).map((cocktail, index) => {
            return (
                <div key={index}>
                    <Cocktail
                    key={index}
                    id={index}
                    cocktail={cocktail}
                    spiritUsed={this.props.spiritUsed}
                    isAdmin={this.props.isAdmin}
                    />
                    
                </div>
            );
        });
    }
    toggleCocktailList(){
        this.setState((prevState) => {
        prevState.active = !prevState.active;
        });
    }
    render() {

        return(
            <div className="cocktail-list">
                <h2 
                    className={(this.state.active)? "active-list":"default-list"}
                    onClick={ (e) => this.toggleCocktailList(e) }
                     >{this.props.spiritUsed}
                </h2>
                
                { (this.state.active) ? this.renderCocktails() : '' }

            </div>
        );
    }
}
export default CocktailList;