import React from 'react';
import '../../../../styles/menu/drinks/spirits/spirit.css';

export const Spirit = (props) => {
	const { spirit, spiritUsed } = props;
    
    //Make Html template matches database prices attributes depending on the current spirit rendered    
    let renderPrice = () => {
        if (spiritUsed ==='Saké') {
            return(
                <div>
                    <p>4cl...{spirit.price4cl}</p>
                    <p>12cl...{spirit.price12cl}</p>
                </div>
            )
        } else if (spiritUsed === "Whisky") {
            return(
                <div>
                    <p>2cl...{spirit.price2cl}</p>
                    <p>4cl...{spirit.price4cl}</p>
                </div>
            )
        } else {
            return(
                <p>4cl...{spirit.price}</p>
            )
        }
    }

	return (
        
        <div className="spirit">
           
            <span >{spirit.name}</span>
            <p>{spirit.description}</p>
           { renderPrice() }
                
        </div>
    );
}
