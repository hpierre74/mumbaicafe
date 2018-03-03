import React from 'react';
import '../../../../styles/menu/drinks/spirits/spirit.css';
import Edit from '../../../admin/Edit';

export const Spirit = (props) => {
	const { spirit, id, spiritUsed } = props;
    
    //Make Html template matches database prices attributes depending on the current spirit rendered    
    let renderPrice = () => {
        if (spiritUsed ==='Saké') {
            return(
                <div>
                    <p>4cl...{spirit.price1}</p>
                    <p>12cl...{spirit.price2}</p>
                    <Edit 
                        type='NameDescription2Prices' 
                        field={'drinks/spirits/'+spiritUsed}
                        entry={id}
                        data={spirit}
                    />
                </div>
            )
        } else if (spiritUsed === "Whisky") {
            return(
                <div>
                    <p>2cl...{spirit.price1}</p>
                    <p>4cl...{spirit.price2}</p>
                    <Edit 
                        type='NameDescription2Prices' 
                        field={'drinks/spirits/'+spiritUsed}
                        entry={id}
                        data={spirit}
                    />
                </div>
            )
        } else {
            return(
                <div>
                    <p>4cl...{spirit.price}</p>
                    <Edit 
                        type='NamePrice' 
                        field={'drinks/spirits/'+spiritUsed}
                        entry={id}
                        data={spirit}
                    />
                </div>

            )
        }
    }

	return (
        
        <div className="spirit">
           {(spirit.name !== (undefined|| null))?
            <div><span >{spirit.name}</span>
            <p>{spirit.description}</p>
            {renderPrice()} </div>
        :''}
        </div>
    );
}
