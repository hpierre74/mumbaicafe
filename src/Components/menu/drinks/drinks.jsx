import React, { Component } from 'react';
import '../../../styles/menu/drinks/drinks.css';


class Drinks extends Component {

    
    render() {
        
        return(
            <div className="drinks-container">

                <div className="drinks-buttons">
                    {/* <a className={(this.props.active==="spirits")?"active":"default"} onClick={ (e) => this.props._toggleActive('spirits','drinks') } name='spirits' >Spirits</a> */}
                    <a className={(this.props.active==="cocktails")?"active":"default"} onClick={ (e) => this.props._toggleActive('cocktails','drinks') } name='cocktails' >Cocktails</a>
                    <a className={(this.props.active==="softs")?"active":"default"} onClick={ (e) => this.props._toggleActive('softs','drinks') } name='softs' >Softs</a>
                    <a className={(this.props.active==="beers")?"active":"default"} onClick={ (e) => this.props._toggleActive('beers','drinks') } name='beers' >Beers</a>
                    <a className={(this.props.active==="wines")?"active":"default"} onClick={ (e) => this.props._toggleActive('wines','drinks') } name='wines' >Wines</a>

                </div>
                <div className='drinks'>
                    {this.props.children}
                </div>
            </div>
        );
    }
}
export default Drinks;