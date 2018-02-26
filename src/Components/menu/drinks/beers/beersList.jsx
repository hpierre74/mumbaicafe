import React, { Component } from 'react';
import '../../../../styles/menu/drinks/beers/beers-list.css';
import { Beer } from './beer.jsx';


class BeersList extends Component {
    constructor(props){
        super(props);
        
        this.state = {
            active: true
        }

    }
    renderBeers() {
        return  Object.values(this.props.data[this.props.beerUsed]).map((beer, index) => {
            return(
                <Beer
                    key={index}
                    id={index}
                    beer={beer}
                    beerUsed={this.props.beerUsed}
                />
            )
        });
    }

    toggleBeerList(){
        this.setState((prevState) => {
        prevState.active = !prevState.active;
        });
    }
    
    render() {
        let styles = {
            BeerTitleInactive : {
                padding: '2%',
                margin: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                border: '1px solid white '
            },
            BeerTitleActive :{
                padding: '2%',
                margin: 0,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                border: '1px solid white',
                background:'white',
                color:'black'
            },
            BeerListContainer : {
                border: "1px solid white",
                borderRadius: 10
            }
        }

        return(
            <div style={styles.BeerListContainer}>
                
                <h2 
                    style={(this.state.active)? styles.BeerTitleActive : styles.BeerTitleInactive}
                    onClick={ (e) => this.toggleBeerList(e) }
                     >{this.props.beerUsed}
                </h2>
                <div onClick={(e) => this.toggleBeerList(e)} >
                    {(this.state.active)?this.renderBeers():''}
                </div>

            </div>
        );
    }
}
export default BeersList;