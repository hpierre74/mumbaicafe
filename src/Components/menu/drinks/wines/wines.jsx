import React from 'react';
import '../../../../styles/menu/drinks/wines/wines.css';

export const Wines = (props) => {
    const { data } = props;
    const renderWines = () => {
        return  Object.values(data).map((wine, index) => {
            return(
                <div key={index}>
                    <h3>{ wine.name }</h3>
                    <p><span>Verre...{ wine.glass }</span> / <span>Bouteille... { wine.btl } </span></p>
                </div>
            );
        });  
    }          
    return(
        <div className="wines">
            <h2>Wines</h2>
            { renderWines() }   
        </div>
    )   
}