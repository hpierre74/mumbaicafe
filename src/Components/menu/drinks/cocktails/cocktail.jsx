import React from 'react';
import '../../../../styles/menu/drinks/cocktails/cocktail.css';
import AdminInterface from '../../../forms/AdminInterface.jsx';
import Edit from '../../../admin/Edit';

export const Cocktail = (props) => {
    const { id, spiritUsed, cocktail, isAdmin } = props;
    //console.log(isAdmin,spiritUsed)
    cocktail.id = id;
    console.log(id);
    
	return (
        
        <div className="cocktail">
            <br/>
            <h3>{cocktail.name}</h3>
            <span className="cocktail-price" >{cocktail.price}</span>
            <p>{cocktail.description}</p>
            <Edit 
                field={'drinks/cocktails/'+spiritUsed}
                type='NameDescriptionPrice'
                entry={id}
                data={cocktail}/>
            {/* {(!isAdmin)?<AdminInterface
                        data={cocktail}
                        type='NameDescriptionPrice'
                        entry={id}
                        
                        field={'drinks/cocktails/'+spiritUsed}
                    />:''} */}
                      
        </div>
    );
};