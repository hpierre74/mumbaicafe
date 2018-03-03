import React from 'react';
import '../../../../styles/menu/drinks/beers/beers.css';
import BeersList from './beersList.jsx';
import { Collapse } from 'reactstrap';


const Beers = (props) => {
    const {data, active, isAdmin} = props;
    const renderBeersList = () => {
        return  Object.keys(data).map((beerUsed, index) => {
            return (
                <BeersList 
                data={data}
                key={index}
                id={index}
                beerUsed={beerUsed}
                isAdmin={isAdmin}
                />
            );
        });
    }
    return (
        <Collapse isOpen={ active } className='beers'>
            <h2>Beers</h2>
            { renderBeersList() }
        </Collapse>
    );
};

export default Beers;

