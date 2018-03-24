import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';

class Markers extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.markers &&
          this.props.markers.map(marker => (
            <Marker
              onClick={this.onMarkerClick}
              name={name}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              key={marker.id}
            />
          ))}
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    current_list: state.current_list
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Markers);
