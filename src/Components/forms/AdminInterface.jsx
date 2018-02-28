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
            changes:props.data
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
        this.setState((prevState) => {
            prevState.changes[key] = e.target.value
        });
        console.log(this.state);
    }
    update(e, field, id){
        e.preventDefault();
        firebase.database().ref(field).update({
            [id]:this.state.changes
        });
        
    }
    componentWillReceiveProps(nextProps) {
        this.setState({ changes: nextProps.data  });
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
                        data={this.state.data}
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



