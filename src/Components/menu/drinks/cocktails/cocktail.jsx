import React from 'react';
import '../../../../styles/menu/drinks/cocktails/cocktail.css';
import AdminInterface from '../../../forms/AdminInterface.jsx';

export const Cocktail = (props) => {
    const { id, spiritUsed, cocktail, isAdmin } = props;
    //console.log(isAdmin,spiritUsed)
    cocktail.id = id;
    
	return (
        
        <div className="cocktail">
            <br/>
            <h3>{cocktail.name}</h3>
            <span className="cocktail-price" >{cocktail.price}</span>
            <p>{cocktail.description}</p>
            {(isAdmin)?<AdminInterface
                        data={cocktail}
                        type='cocktail'
                        //entry={id+'/description'}
                        
                        field={'drinks/cocktails/'+spiritUsed}
                    />:''}
                      
        </div>
    );
};