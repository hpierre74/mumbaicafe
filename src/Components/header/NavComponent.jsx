import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/img/logo.svg';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    //NavLink,
    } from 'reactstrap';

class NavAdmin extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    return (
      <div>
        <Navbar color="faded"  dark >
          <NavbarBrand href="/">
            <img src={logo} height='125px' width='200px' alt="logo"/>
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink  className={(this.props.active==='home')?'text-warning':'text-white'} id='nav-link' to="/">Accueil</NavLink>
              </NavItem>
              {/* <NavItem>
                <NavLink active={(this.props.active==='presse')?true:false} className='text-white' id='nav-link' to="/presse">Presse</NavLink>
              </NavItem> */}
              <NavItem>
                <NavLink className={(this.props.active==='book')?'text-warning':'text-white'} id='nav-link' to="/book">Réserver</NavLink>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
 
export default NavAdmin;