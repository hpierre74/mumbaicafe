import React, {Component} from 'react';
import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends Component {
render() {
    const style = {
  width: '80%',
  height: '100%'
}

    return (
      <Map 
        google={this.props.google}
        zoom={16}
        style={style}
        initialCenter={{
            lat: 45.7680692,
            lng: 4.8329078
          }}>

        <Marker onClick={this.onMarkerClick}
                name={'Mumbai Café'}
                title='Mumbai Café'
                label='Mumbai Café'
                 />

        <InfoWindow visible={true} onClose={this.onInfoWindowClose}>
            <div>
              <h1>Mumbai Café</h1>
              <p>6 rue Sainte Catherine, 69001, Lyon</p>
            </div>
        </InfoWindow>
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: ('AIzaSyDTAbid4TlNDfHsEzNG_EXcejcz5LavKf4')
})(MapContainer)