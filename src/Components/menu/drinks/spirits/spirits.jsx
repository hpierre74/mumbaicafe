import React from 'react';
import '../../../../styles/menu/drinks/spirits/spirits.css';
import SpiritsList from './spiritsList.jsx';


const Spirits = (props) => {
    const {data} = props;
    const renderSpiritsList = () => {
        return  Object.keys(data).map((spiritUsed, index) => {
            return (
                <SpiritsList 
                data={data}
                key={index}
                id={index}
                spiritUsed={spiritUsed}
                />
            );
        });
    }
    return (
        <div className="spirits">
            <h2>Spirits</h2>
            <div>
            { renderSpiritsList() }
            </div>
        </div>
    );
};

export default Spirits;