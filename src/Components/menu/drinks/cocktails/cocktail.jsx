import React from 'react';
import '../../../../styles/menu/drinks/cocktails/cocktail.css';
import AdminInterface from '../../../forms/AdminInterface.jsx';
import Edit from '../../../admin/Edit';

export const Cocktail = (props) => {
    const { id, spiritUsed, cocktail, isAdmin } = props;
    cocktail.id = id;
    
	return (
        
        <div className="cocktail">
            <br/>
            <h3>{cocktail.name}</h3>
            <span className="cocktail-price" >{cocktail.price}</span>
            <p>{cocktail.description}</p>
            <Edit 
                field={'drinks/cocktails/'+spiritUsed}
                type='NameDescriptionPrice'
                entry={id+1}
                data={cocktail}/>
        </div>
    );
};