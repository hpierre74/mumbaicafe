import React from 'react';
import '../../../styles/menu/food/cathering.css';

const Cathering = (props) => {
    const { data } = props;
    const choiceProducts = (choice) => {
        return Object.values(choice).map((product,index) => {
            return(
                <li key={index}>
                    {product}
                </li>
            )
        })
    }
    const renderCathering = () => {
        return Object.values(data).map((choice,index) => {
            return(
                <div key={index} className='cathering-offer'>
                    <h3>{choice.description}</h3>
                    <h4>{choice.offer}</h4>
                    <ul className='cathering-list'>
                        {
                        choiceProducts(choice.products)
                        }
                    </ul>
                    
                </div>
            )
        })
    }
    return (
        <div className='cathering' >
            {renderCathering()}
        </div>
    );
};

export default Cathering;