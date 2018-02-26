import React, { Component } from 'react';
import { Collapse, Button, Row, Col, Container } from 'reactstrap';
import FoodSlider from './food-slider.jsx';

class Lunch extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = { collapse: false };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    return (
        <div className='lunch'>
            <div>
                <Row>
                    <Col>
                        <h3>Le Midi</h3>
                    </Col>
                </Row>
                <Row>
                    <Col className="colunch" xs="12" sm="12" md="6">
                        <div>                   
                            <p className='lunch-intro'>Le midi, notre chef Stéphane Martin Guerrero vous propose une cuisine du marché et du jour à partir de 12h00 du lundi au vendredi dans une ambiance café de quartier du monde</p>
                            <p className="lunch-price">Plat du Jour 9,50€. En plus de nos incontournables Thalis.</p>
                        </div>
                    </Col>
                    <Col className="colunch" xs="12" sm="12" md="6">
                        <FoodSlider />
                    </Col>
                </Row>
            </div>
            <Button outline onClick={this.toggle} style={{ marginBottom: '1rem' }}>En Savoir Plus</Button>
            <Collapse isOpen={this.state.collapse}>
                <Container>
                    <Row>
                        <Col>
                            <div className="menus">
                                <div >   
                                    <p className="choices">Pour un plat confortable, une petite entrée ou meme les deux, un poke bowl, un Buddha bowl, des plats végétariens ou vegan
                                    mais aussi des grillades de viandes.</p>
                                    <p className="kindof">Stéphane décline une cuisine fusion asiatique très colorée qu'il mélange subtilement avec ses origines et ses carnet de voyages. 
                                    Son maître mot ? Le PARTAGE. N'hésitez pas à lui faire part de vos goûts, il saura trouver le plat qui vous correspond.</p>
                                    <p className="adapt">Ici pas de chichi, la diversité de nos produits nous permet de nous adapter : 
                                        besoin d'un plat rapide le midi ? D'une LunchBox à emporter ? D'un déjeuner d'affaire raffiné ? Aucun problème !
                                    </p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </Collapse>
        </div>
    );
  }
}
export default Lunch;