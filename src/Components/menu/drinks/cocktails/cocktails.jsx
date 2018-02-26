import React from 'react';
import '../../../../styles/menu/drinks/cocktails/cocktails.css';
import CocktailList from './cocktail-list.jsx';


const Cocktails = (props) => {
    const { data, isAdmin } = props;
    const renderCocktailList = () => {
        return  Object.keys(data).map((spiritUsed, index) => {
            return (
                <CocktailList 
                data={data}
                key={index}
                id={index}
                spiritUsed={spiritUsed}
                isAdmin={isAdmin}
                />
            );
        });
    }
    
    return (
        <div className="cocktails">
            <h2>Cocktails</h2>
            
            { renderCocktailList() }
            
        </div>
    );
};

export default Cocktails;
