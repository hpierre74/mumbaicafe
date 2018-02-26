import React, { Component } from 'react';
import * as firebase from 'firebase';
import '../../firebase.conf.js';
import { Button } from 'reactstrap';
//import Delete from './delete.jsx';
import Edit from './edit.jsx';
import '../../styles/forms/admin-interface.css';

class AdminInterface extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit:false,
            delete:false,
            changes:[]
        }
    }
    // componentWillReceiveProps(nextProps) {
    //     this.setState({ changes: nextProps.data  });
    //     console.log(nextProps.data);
        
    // }

    
    toggleActiveAI(e,parent) {
        e.preventDefault();
        this.setState((prevState) => {
            prevState[parent] = !prevState[parent]
        });
        
    }
    handleChange(e, key){
        e.persist();
        console.log(e, key, this.state);
        
        this.setState((prevState) => {
            prevState.changes[key] = e.target.value
        });
    }
    update(e, field, id){
        e.preventDefault();
        let changeItem = firebase.database().ref().child('/'+field);
        //let changes = (this.state.changes!=='')?this.state.changes:changeItem[entry];
        changeItem.update({
            id:this.state.changes
        });
        
    }
    

    render() {
        return (
            <div className="ai">
                {(!this.state.edit)?
                <div>
                    <div  onClick={(e) => this.toggleActiveAI(e,'edit')} >
                        <Button className='admin-Button'>Edit</Button>
                    </div>
                </div>
                :
                <div>
                    <Edit
                        update={this.update.bind(this)}
                        handleChange={this.handleChange.bind(this)}
                        data={this.props.data}
                        entry={this.props.entry}
                        field={this.props.field}
                        type={this.props.type}
                    />
                    <div  >
                        <Button className='admin-Button' onClick={(e) => this.toggleActiveAI(e,'edit')}>Quit Edit Mode</Button>
                    </div>

                </div>
                }
                {/* {(this.state.delete)?
                <div>
                    <Button onClick={(e) => this.toggleActiveAI(e,'delete')} >Delete</Button> 
                </div>
                :
                <div>
                    <Delete                    
                        toggleActiveAI={this.toggleActiveAI.bind(this)}
                        deleteItem={this.props.deleteItem}
                        entry={this.props.entry}
                        field={this.props.field}
                    />
                </div>
                }*/ }
            </div>
        );
    }
}

export default AdminInterface;



