import React, { Component } from 'react';
import { Container, Collapse } from 'reactstrap';
//import { NavLink } from 'react-router-dom';
import '../App.css';
import * as firebase from 'firebase';
import '../firebase.conf.js';
import Header from '../Components/header/Header.jsx';
import Presentation from '../Components/presentation/Presentation.jsx';
import Menu from '../Components/menu/Menu.jsx';
import Food from '../Components/menu/food/food.jsx';
import Meal from '../Components/menu/food/meal.jsx';
import Insects from '../Components/menu/food/insects.jsx';
import Cathering from '../Components/menu/food/cathering.jsx';
import Drinks from '../Components/menu/drinks/drinks.jsx';
//import Cocktails from '../Components/menu/drinks/cocktails/cocktails.jsx';
import CocktailMenu from '../Components/menu/drinks/cocktails/cocktail-menu';
import Beers from '../Components/menu/drinks/beers/beers.jsx';
import {Softs} from '../Components/menu/drinks/softs/softs.jsx';
//import Spirits from '../Components/menu/drinks/spirits/spirits.jsx';
import {Wines} from '../Components/menu/drinks/wines/wines.jsx';
import BookerV2 from '../Components/booker/BookerV2.jsx';
import BookerForm from '../Components/booker/BookerForm';
import Footer from '../Components/footer/footer.jsx';

const defaultState = {
    drinks:{
      cocktailMenu:[],
      softs:[],
      beers:[],
      wines: [],
      spirits:[]
    },
    food:{
      meal:{
        dinner:{
          thaly:{
            concept:'',
            products:[]
          }
        }
      },
      insects:[],
      tapas:[],
      cathering:[]
    } 
  }
class Main extends Component {
    constructor(props) {
        super(props);
        this.clientDevice='desktop';
        this.state = { 
            data: defaultState,
            isAdmin: false,
            active:{
                menu:'food',
                food:'meal',
                drinks:'cocktails',
                presentation:false,
                booker:true
            }
        }
        this.toggleActive = this.toggleActive.bind(this);

    }
    componentWillMount() {
        const rootRef = firebase.database().ref();
        rootRef.on('value', snap => {
            this.setState({
                data: snap.val()
            });
        });
    }
    getClientWindowSize() {
        if(window.innerWidth<599) {
          this.clientDevice ='phone';
        } else if(window.innerWidth<999) {
          this.clientDevice = 'tablet';
        } else {
          this.clientDevice = 'desktop';
        }
    }
    toggleActive(component, parent) {
        this.setState((prevState) => {
          prevState.active[parent] = component
        });
      }
      
      //Render Component depending on the active food state
      renderFoodChild() {
        switch(this.state.active.food) {
          case 'meal': return(
            <Meal 
              isAdmin={this.props.isAdmin}
              data={this.state.data.food.meal}
              clientDevice={ this.clientDevice }/>
          );
          case 'insects': return(
            <Insects 
              isAdmin={this.props.isAdmin}
              data={this.state.data.food.insects}/>
          );
          case 'cathering': return(
            <Cathering isAdmin={this.props.isAdmin} data={this.state.data.food.cathering}/>
          );
          default: return;
        }
      }
      //render component depending on the active drinks state
      renderDrinksChild() {
        switch(this.state.active.drinks) {
          case 'cocktails': return(
            <CocktailMenu 
              isAdmin={this.props.isAdmin} 
              data={this.state.data.drinks.cocktailMenu} 
              active={ (this.state.active.drinks === 'cocktails')?true:false }

            />);
          case 'beers': return(
            <Beers 
              isAdmin={this.props.isAdmin}
              data={this.state.data.drinks.beers}
              active={ (this.state.active.drinks === 'beers')?true:false }

            />);
          case 'wines': return(
            <Wines
              isAdmin={this.props.isAdmin}
              data={this.state.data.drinks.wines}
              active={ (this.state.active.drinks === 'wines')?true:false }
            />);
          case 'softs': return(
            <Softs
              isAdmin={this.props.isAdmin}  
              data={this.state.data.drinks.softs}
              active={ (this.state.active.drinks === 'softs')?true:false }

            />);
          default: return;
        }
    }
    isAdmin() {
        if(this.props.isAdmin) { 
          return true
        } else { return false }
    }
    
    componentDidUpdate(prevProps, prevState) {
    this.getClientWindowSize();
    
    }
    render() { 
        return ( 
            <Container>
                <Header clientDevice={ this.clientDevice } isAdmin={this.props.isAdmin}/>
                <Container fluid>
                  <div id='aristo-title'>
                    <h5 >Notre Bartender Jimmy Cassar en finale mondiale Bacardi</h5>
                    <small id='aristo-text'>Venez l'encourager et découvrir son cocktail "L'Aristocrate" au Mumbai Café</small>
                  </div>
                  <iframe title='aristocrate vidéo' id='aristo-video' width={window.innerWidth>1000? 840 : 374} height={window.innerWidth>1000? 472.5 : 210} src="https://www.youtube.com/embed/-ePDn47XY_0?rel=0" frameBorder="0" allowFullScreen></iframe>
                </Container>
                <Presentation 
                    clientDevice={ this.clientDevice }
                    pathToPresentation={firebase.database().ref('presentation')} 
                    presentation={this.state.data.presentation}
                    active={this.state.active.presentation}
                    toggleActive={this.toggleActive.bind(this)}
                    isAdmin={this.props.isAdmin}             
                />
                <Menu
                    clientDevice={ this.clientDevice }
                    toggleActive={this.toggleActive.bind(this)}
                    activeMenu={this.state.active.menu}
                    isAdmin={this.props.isAdmin}
                >
                 
                      <Collapse isOpen={ (this.state.active.menu==="food")?true:false }>
                        <Food isAdmin={this.props.isAdmin} path={firebase.database().ref('food')}  active={this.state.active.food} _toggleActive={this.toggleActive.bind(this)}>
                        {(this.state.data.food!==null)?this.renderFoodChild():''}
                        </Food>
                      </Collapse>
                  
                      <Collapse isOpen={ (this.state.active.menu==="drinks")?true:false }>
                        <Drinks isAdmin={this.props.isAdmin} path={firebase.database().ref('drinks')} active={this.state.active.drinks} _toggleActive={this.toggleActive}>
                        {(this.state.data.drinks!==null)?this.renderDrinksChild():''}
                        </Drinks>
                      </Collapse>
                    
                </Menu>
                
                <BookerV2>
                  <BookerForm />
                </BookerV2>
                <Footer />                  
            </Container>

        )
    }
}
 
export default Main;