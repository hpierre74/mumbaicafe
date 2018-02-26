import React from 'react';
import '../../../styles/menu/food/insects.css';


const Insects = (props) => {
    const { data } = props;
    const renderInsects = () => {
        return  Object.values(data).map((insect, index) => {        
            return(
                <div className="insect" key={index}>
                    <p className="insect-name">{ insect.name }</p>                    
                </div>
            )
        })
    }
    return (
        <div className="insects">
                <div>
                    <h2>Nos insectes</h2>
                    <p>En apéritif, dégustation ou à emporter, profitez de notre choix d'insecte unique à Lyon</p>
                </div>
                <div>
                    { renderInsects() }
                </div>
                <div>
                    <p>Assiettes de dégustation à 10€, 15€ et 20€</p>
                    <p>Les prix unitaires sont disponibles auprès du staff.</p>   
                </div>
            </div>
    );
};

export default Insects;
