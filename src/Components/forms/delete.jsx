import React from 'react'

const Delete = (props) => {
    const { deleteItem, toggleActiveAI, entry, field } = props;
    const style = {
        position:'fixed',
        top:0,
        left:0,
        background:'white',
        width:'50%',
        padding:'15%'
    }
    return (
        <div style={style} className="delete">
            <div>
                <h4>Voulez vous vraiment supprimer cet élément ?</h4>
                <div>
                    <span onClick={(e) => deleteItem(entry,field)}>Oui</span>
                    <span onClick={(e) => toggleActiveAI('delete')}>Non</span>
                </div>
            </div>
        </div>
    );
};


export default Delete;