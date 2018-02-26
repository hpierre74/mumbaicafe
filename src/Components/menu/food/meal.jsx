import React from 'react';
import '../../../styles/menu/food/meal.css';
import thali  from '../../../img/food/thali.jpg';
import Lunch from './lunch.jsx';
import {Button} from 'reactstrap';


const Meal = (props) => {
    const { data, clientDevice } = props;
    const renderProducts = () => {
        return Object.values(data.dinner.thaly.products).map((product, index) => {
            return (<li key={index}> { product } </li>)
        })
    }
    return (
        <div className="meal">
            
            <div className='thali'>
                <h4>Le Thali</h4>
                <p> {data.dinner.thaly.concept} </p>
                <div className='thali-products'>
                    <ul className='thali-list'>
                        { renderProducts() }
                    </ul>
                    <img 
                        src={thali} 
                        width={(clientDevice === 'desktop')?'720px':window.innerWidth/4*3+'px'} 
                        height={(clientDevice === 'desktop')?'480px':window.innerHeight/1.5+'px'}
                        alt="thali"
                    />
                </div>
                <div className="thali-price">
                    <Button outline>
                        <h4>Prix / personne : 17€</h4>
                    </Button>
                    
                </div>
                <hr/>
            </div>
            <Lunch />
        </div>

    );
};

export default Meal;


                   
                    
