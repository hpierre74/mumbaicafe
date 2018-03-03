import React from 'react';
import '../../../../styles/menu/drinks/beers/beer.css';
import Edit from '../../../admin/Edit';

export const Beer = (props) => {
    const { beer, beerUsed, id, isAdmin } = props;
    return (
        <div className="beer-container"  >
            <span className="beer-product"  >{beer.name}</span>
            <p className="beer-price"> {beer.price} </p>
            <Edit 
                isAdmin={isAdmin}
                type='NamePrice' 
                field={'drinks/beers/'+beerUsed}
                entry={id+1}
                data={beer}
            />
        </div>
        
    );
};

