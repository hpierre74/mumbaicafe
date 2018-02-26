import React from 'react';

export const Product = (props) => {
    const { product, category, isAdmin, name, type } = props;
    const cocktail = () => {
        return(
            <div className="cocktail">
                <h3>{product.name}</h3>
                <span>{product.price}</span>
                <p>{product.description}</p>
                {(isAdmin)?<AdminInterface
                            data={cocktail.description}
                            entry={id+'/description'}
                            field={'drinks/cocktails/'+type}
                        />:''}            
            </div>);
    }
    const spirit = () => {
        if (type ==='Saké') {
            return(
                <div>
                    <p>4cl...{product.price4cl}</p>
                    <p>12cl...{product.price12cl}</p>
                </div>
            )
        } else if (type === "Whisky") {
            return(
                <div>
                    <p>2cl...{product.price2cl}</p>
                    <p>4cl...{product.price4cl}</p>
                </div>
            )
        } else {
            return(
                <p>4cl...{product.price}</p>
            )
        }
    }

        

    const renderProductByType = (product) => {
        if(category==='cocktails') {
            return cocktail;
        }
        if(category==='spirits') {
            return spirit;
        }
    }
	return (
        
        <div className={product.category}>
                            
        </div>
    );
};