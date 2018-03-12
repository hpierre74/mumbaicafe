import React from 'react';
import '../../../styles/menu/food/meal.css';
import thali  from '../../../assets/img/food/thali.jpg';
import Lunch from './lunch.jsx';
import {Button} from 'reactstrap';
import Edit from '../../admin/Edit';


const Meal = (props) => {
    const { data, clientDevice } = props;
    const renderProducts = () => {
        return Object.values(data.dinner.thaly.products).map((product, index) => {
            return (
            <li key={index}> 
                <div> 
                    { product } 
                    <Edit 
                        type='singletext'
                        field='food/meal/dinner/thaly/products'
                        entry={index}
                        data={product}/>
                </div> 
            </li>)
        })
    }
    return (
        <div className="meal">
            
            <div className='thali'>
                <h4>Le Thali</h4>
                <p> {data.dinner.thaly.concept} </p>
                <Edit 
                    type='singletext'
                    field='food/meal/dinner/thaly'
                    entry='concept'
                    data={data.dinner.thaly.concept}/>

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


                   
                    
