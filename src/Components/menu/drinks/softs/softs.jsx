import React from 'react';
import '../../../../styles/menu/drinks/softs/softs.css';
import { Collapse } from 'reactstrap';
import Edit from '../../../admin/Edit';



export const Softs = (props) => {
    const { data, active, isAdmin } = props;
    const renderSofts = () => {       
        return  Object.values(data).map((soft, index) => {
            return(
                <li key={index}>
                    <div className="soft" key={index}>
                        <span className="product">{ soft.name }</span>
                        <span className="price">{ soft.price }</span>
                    </div>
                    <div>
                        <Edit
                            isAdmin={isAdmin}
                            type="NamePrice"
                            field='drinks/softs'
                            entry={index+1}
                            data={soft}/>
                    </div>
                </li>
            )
        })   
    }          
    return(
        <Collapse isOpen={ active } className="softs">
            <h2>Softs</h2>
                <ul>
                    { renderSofts() }
                </ul> 
        </Collapse>
    )   
}
