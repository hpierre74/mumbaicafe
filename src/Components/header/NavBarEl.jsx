import React, { Component } from 'react';
import '../../styles/header/navbar.css';
import {Popover, PopoverHeader, PopoverBody} from 'reactstrap';
//import NavItem from './NavItem.jsx';
//import logo from "../../img/logo.svg";
import iconFB from "../../img/social/facebook-logo.svg";
import iconInsta from "../../img/social/instagram-logo.svg";
import iconPhone from "../../img/social/phone-logo.svg";
import foodora from "../../img/social/foodora-logo.svg";

class NavBarEl extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { popoverOpen: false };
    }
    toggle() {
        this.setState({ popoverOpen: !this.state.popoverOpen });
    }
    render() {
        return (
            <div className="fix-container" >
                <div className="nav" >
                    <div>
                        <div className="nav-icons" >                            
                            <a href="https://www.facebook.com/Mumbai-Caf%C3%A9-1685414335040215/" className="nav-social-links" >
                                <img className="nav-social-icon"  src={iconFB} width="100%" height="100%"  alt="facebook"/>
                            </a>
                            <a href="https://instagram.com/mumbaicafelyon/" className="nav-social-links" >
                                <img className="nav-social-icon"  src={iconInsta} width="100%" height="100%"  alt="instagram"/>
                                
                            </a>
                            <div onClick={this.toggle} id="popover1" className="nav-social-links" >
                                <img className="nav-social-icon"  src={iconPhone} width="100%"  height="100%" alt="fb"/>
                                <Popover placement="right" isOpen={this.state.popoverOpen} target="popover1" toggle={this.toggle}>
                                    <PopoverHeader>Téléphone</PopoverHeader>
                                    <PopoverBody>09.86.35.07.43</PopoverBody>
                                </Popover>
                            </div>
                                <a href="https://www.foodora.fr/restaurant/s6bu/mumbai-cafe" className="nav-social-links" >
                                <img className="nav-social-icon"  src={foodora} width="100%" height="100%"  alt="instagram"/>
                                
                            </a>
                        </div>                        
                    </div>
                </div>
            </div>
        )
    }
}
export default NavBarEl;