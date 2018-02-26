import React, { Component } from 'react'
import "../../styles/header/nav-item.css"


class NavItem extends Component {
  constructor(props) {
        super(props)

        this.state = {
            active: 'false'
        }     
    }
    componentWillMount(){
        (this.props.name === this.props.activeName) ? this.setState({ active: true }) : this.setState({ active: false });
    }
    
    render() {

        return (
            <div className="nav-item" >
                <h4>{this.props.name}</h4>
            </div>
        )
    }
}
export default NavItem
