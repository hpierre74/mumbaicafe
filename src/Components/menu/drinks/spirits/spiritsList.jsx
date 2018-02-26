import React, { Component } from 'react';
import '../../../../styles/menu/drinks/spirits/spirits-list.css';
import { Spirit } from './spirit.jsx';
import { Collapse } from 'reactstrap';






class SpiritsList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            collapse: false
        }

    }
    renderSpirits() {

        return  Object.values(this.props.data[this.props.spiritUsed]).map((spirit, index) => {
            return(
                <Spirit
                    key={index}
                    id={index}
                    spirit={spirit}
                    spiritUsed={this.props.spiritUsed}
                />
            )
        });
    }
    renderTemplateBySpirit(){
        if( (this.props.spiritUsed === 'Saké') || (this.props.spiritUsed === 'Whisky') ) {
            return(
                <div className="longer-list" >
                    { this.renderSpirits() }
                </div>
            )
        } else {
            return(
                <div className="default-list" >
                    { this.renderSpirits() }
                </div>
            )
        }
    }
    toggleSpiritList(){
        this.setState((prevState) => {
        prevState.collapse = !prevState.collapse;
        });
    }
    
    render() {

        return(
            <div className="spirits-list">
                
                <h2 
                    className={(this.state.collapse)? "active-list-title":"default-list-title"}
                    onClick={ (e) => this.toggleSpiritList(e) }
                     >{this.props.spiritUsed}
                </h2>
                <Collapse isOpen={this.state.collapse}>
                {this.renderTemplateBySpirit()}
                </Collapse>


            </div>
        );
    }
}
export default SpiritsList;