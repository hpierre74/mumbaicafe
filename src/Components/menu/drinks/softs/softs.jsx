import React from 'react';
import '../../../../styles/menu/drinks/softs/softs.css';



export const Softs = (props) => {
    const { data } = props;
    const renderSofts = () => {       
        return  Object.values(data).map((soft, index) => {
            return(
                <li key={index}>
                    <div className="soft" key={index}>
                        <span className="product">{ soft.name }</span>
                        <span className="price">{ soft.price }</span>
                    </div>
                </li>
            )
        })   
    }          
    return(
        <div className="softs">
            <h2>Softs</h2>
                <ul>
                    { renderSofts() }
                </ul> 
        </div>
    )   
}
