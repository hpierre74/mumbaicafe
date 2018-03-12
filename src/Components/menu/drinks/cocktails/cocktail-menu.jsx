import React from 'react';
import { 
    Row,
    Col,
    Card,
    CardText, 
    CardBody, 
    CardTitle, 
    CardSubtitle, 
    Collapse
} from 'reactstrap';
import Edit from '../../../admin/Edit';

const CocktailMenu = (props) => {
    const { data, isAdmin, active } = props;
    const renderCocktailList = () => {
        return  Object.values(data).map((cocktail, index) => {
            return (
                <Col md='6' sm='12' xs='12' key={index}> 
                    <Card style={{background: 'transparent', border:'none'}} >
                        <CardBody>
                            <CardTitle>{cocktail.name}</CardTitle>
                            <CardSubtitle>{cocktail.price}</CardSubtitle>
                            <CardText>{cocktail.description}</CardText>
                            <Edit 
                                type='NameDescriptionPrice'
                                field='drinks/cocktailMenu'
                                entry={index}
                                data={cocktail}
                                isAdmin={isAdmin} />
                        </CardBody>
                    </Card>
                </Col>
            );
        });
    }
    
    return (
        <Collapse isOpen={ active } style={{marginTop:'2.5%'}}>
            <h2 style={{margin:'2.5%'}}>Cocktails</h2>
            <Row>
            { renderCocktailList() }
            </Row>
        </Collapse>
    );
};
 
export default CocktailMenu;