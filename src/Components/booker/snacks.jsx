import React from 'react';
import Snackbar from 'material-ui/Snackbar';

const Snacks = props => {
    return (
      <div>
        <Snackbar
          open={props.open}
          message={props.message}
          autoHideDuration={4000}
          onRequestClose={(e) => props.toggle('snackOpen')}
        />
      </div>
    );
  
}
export default Snacks;