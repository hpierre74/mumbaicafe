import React, { Component } from 'react';
import '../../../../styles/menu/drinks/cocktails/cocktail-list.css';
import AdminInterface from '../../../forms/AdminInterface.jsx';
import { Collapse } from 'reactstrap';
import { Cocktail } from './cocktail.jsx';






class CocktailList extends Component {
    constructor(props){
        super(props);
        this.state = {
            collapse:false
        }
        this.toggleCocktailList = this.toggleCocktailList.bind(this);
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
        this.setState({
            collapse: !this.state.collapse
        });
    }
    render() {

        return(
            <div className="cocktail-list">
                <h2 
                    className={(this.state.collapse)? "default-list":"default-list"}
                    onClick={ (e) => this.toggleCocktailList(e) }
                     >{this.props.spiritUsed}
                </h2>
                <div>
                 
                <Collapse isOpen={this.state.collapse}>
                { this.renderCocktails() }
                </Collapse>
                
                </div>

            </div>
        );
    }
}
export default CocktailList;