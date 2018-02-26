import React from 'react';
import '../../../../styles/menu/drinks/beers/beers.css';
import BeersList from './beersList.jsx';


const Beers = (props) => {
    const {data} = props;
    const renderBeersList = () => {
        return  Object.keys(data).map((beerUsed, index) => {
            return (
                <BeersList 
                data={data}
                key={index}
                id={index}
                beerUsed={beerUsed}
                />
            );
        });
    }
    return (
        <div className='beers'>
            <h2>Beers</h2>
            { renderBeersList() }
        </div>
    );
};

export default Beers;

