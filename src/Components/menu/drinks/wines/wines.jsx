import React from 'react';
import '../../../../styles/menu/drinks/wines/wines.css';
import { Collapse } from 'reactstrap';
import Edit from '../../../admin/Edit';

export const Wines = (props) => {
    const { data, active, isAdmin } = props;
    const renderWines = () => {
        return  Object.values(data).map((wine, index) => {
            return(
                <div key={index}>
                    <h3>{ wine.name }</h3>
                    <p><span>Verre...{ wine.price1 }</span> / <span>Bouteille... { wine.price2 } </span></p>
                    <Edit
                    isAdmin={isAdmin} 
                        type='NamePrice2' 
                        field={'drinks/wines/'}
                        entry={index+1}
                        data={wine}
                    />
                </div>
            );
        });  
    }          
    return(
        <Collapse isOpen={ active } className="wines">
            <h2>Wines</h2>
            { renderWines() }   
        </Collapse>
    )   
}