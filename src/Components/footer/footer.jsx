import React,{ Component } from 'react';
import {Button} from 'reactstrap';
import '../../styles/footer/footer.css';

class Footer extends Component {
    
    toTop() {
        document.documentElement.scrollTop = 0;
    }
    
    

    render(){

        return(
            <div className="footer">
                <Button size="sm" outline onClick={(e) => this.toTop(e)} style={{ marginBottom: '1rem' }}>Retour à l'accueil</Button>

                
            </div>
        )
    }
}
export default Footer;