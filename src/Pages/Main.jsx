import React, { Component } from 'react';
import { Container } from 'reactstrap';
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
import Cocktails from '../Components/menu/drinks/cocktails/cocktails.jsx';
import Beers from '../Components/menu/drinks/beers/beers.jsx';
import {Softs} from '../Components/menu/drinks/softs/softs.jsx';
import Spirits from '../Components/menu/drinks/spirits/spirits.jsx';
import {Wines} from '../Components/menu/drinks/wines/wines.jsx';
import Footer from '../Components/footer/footer.jsx';
import Booker from '../Components/booker/Booker.jsx';
const defaultState = {
    drinks:{
      cocktails:[],
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
              isAdmin={this.state.isAdmin}
              data={this.state.data.food.meal}
              clientDevice={ this.clientDevice }/>
          );
          case 'insects': return(
            <Insects 
              isAdmin={this.state.isAdmin}
              data={this.state.data.food.insects}/>
          );
          case 'cathering': return(
            <Cathering isAdmin={this.state.isAdmin} data={this.state.data.food.cathering}/>
          );
          default: return;
        }
      }
      //render component depending on the active drinks state
      renderDrinksChild() {
        switch(this.state.active.drinks) {
          case 'cocktails': return(
            <Cocktails 
              isAdmin={this.state.isAdmin} 
              path={firebase.database().ref('drinks/cocktails')} 
              data={this.state.data.drinks.cocktails} 
            />);
          case 'spirits': return(
            <Spirits 
              data={this.state.data.drinks.spirits}
              isAdmin={this.state.isAdmin}
            />);
          case 'beers': return(
            <Beers 
              isAdmin={this.state.isAdmin}
              data={this.state.data.drinks.beers}
            />);
          case 'wines': return(
            <Wines
              isAdmin={this.state.isAdmin}
              data={this.state.data.drinks.wines}
            />);
          case 'softs': return(
            <Softs
              isAdmin={this.state.isAdmin}  
              data={this.state.data.drinks.softs}
            />);
          default: return;
        }
    }
    isAdmin() {
        if(this.state.isAdmin) { 
          return true
        } else { return false }
    }
    
    componentDidUpdate(prevProps, prevState) {
    this.getClientWindowSize();
    
    }
    render() { 
        return ( 
            <Container>
                <Header clientDevice={ this.clientDevice } isAdmin={this.state.isAdmin}/>
                <Presentation 
                    clientDevice={ this.clientDevice }
                    pathToPresentation={firebase.database().ref('presentation')} 
                    presentation={this.state.data.presentation}
                    active={this.state.active.presentation}
                    toggleActive={this.toggleActive.bind(this)}
                    isAdmin={this.state.isAdmin}             
                />
                <Menu
                    clientDevice={ this.clientDevice }
                    toggleActive={this.toggleActive.bind(this)}
                    activeMenu={this.state.active.menu}
                    isAdmin={this.state.isAdmin}
                >
                    {
                    (this.state.active.menu==="food")?
                        <Food isAdmin={this.state.isAdmin} path={firebase.database().ref('food')}  active={this.state.active.food} _toggleActive={this.toggleActive.bind(this)}>
                        {(this.state.data.food!==null)?this.renderFoodChild():''}
                        </Food>
                    :
                        <Drinks isAdmin={this.state.isAdmin} path={firebase.database().ref('drinks')} active={this.state.active.drinks} _toggleActive={this.toggleActive}>
                        {(this.state.data.drinks!==null)?this.renderDrinksChild():''}
                        </Drinks>
                    }
                </Menu>
                {/* <Button outline color='success'>
                    <NavLink to='/booking' >Réserver une table</NavLink>
                </Button> */}
                <Booker isAdmin={this.state.isAdmin}/>
                <Footer />                  
            </Container>

        )
    }
}
 
export default Main;