import React, { Component } from 'react';
import '../../../styles/menu/food/tapas.css';


class Tapas extends Component {
    constructor(props){
        super(props);
        this.state = {            
            tapas:[]
        }
    }
    componentWillReceiveProps(nextProps) {        
        this.setState({
            tapas: nextProps.tapas
        });
    }

    renderProducts() {
        return  Object.values(this.state.tapas).map((tapas, index) => {
            return(
                <div key={index}>
                    <p style={{fontSize: "1.25rem"}}>{ tapas.product }</p>
                    <span>{ tapas.price }</span>
                </div>
            )
        })
    }
    render() {
        
        return(
            <div>
                { this.renderProducts() }
            </div>
        )
    }
}
export default Tapas;