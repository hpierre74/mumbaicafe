import React from 'react';
import '../../../../styles/menu/drinks/beers/beer.css';

export const Beer = (props) => {
    const { beer } = props;
    return (
        <div className="beer-container"  >
            <span className="beer-product"  >{beer.name}</span>
            <p className="beer-price"> {beer.price} </p>
        </div>
        
    );
};

