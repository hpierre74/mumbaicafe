import React,{ Component } from 'react';
import '../../styles/header/header.css';
import NavBarEl from './NavBarEl.jsx';
import logo  from '../../assets/img/logo.svg';



class Header extends Component {
    
    render(){
       
        return (
            <div className='header'>
                <img className="logo" src={logo} alt='logo' />
                <NavBarEl />
                <h1>Mumbai Café</h1>
            </div>
        )
    }
}
export default Header;