import React, { Component } from 'react';
import {Container} from 'reactstrap';
import '../../styles/menu/menu.css';





class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active:''
        }
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            active: nextProps.activeMenu
        });
    }

    render() {
   
        return(
            <div className="menu" >
            <Container>
                
                <h1 className='title' >Menu</h1>
                <div className="FnB">    
                    <h2 style={{borderRadius:0, borderTopLeftRadius:'10px',borderBottomLeftRadius:'10px'}} className={(this.state.active ==='food')? "active-button":"button"} onClick={ (e) => this.props.toggleActive('food','menu') } name='food'>Food</h2>
                    <h2 style={{borderRadius:0, borderTopRightRadius:'10px',borderBottomRightRadius:'10px'}} className={(this.state.active ==='drinks')? "active-button":"button"} onClick={ (e) => this.props.toggleActive('drinks','menu') } name='drinks'>Drinks</h2>
                </div>
                { this.props.children }

            </Container>
            </div>
        )
    }
}
export default Menu;