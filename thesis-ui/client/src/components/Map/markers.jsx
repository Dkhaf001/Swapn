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
              position={{ lat: 33.759703, lng: -118.428093 }}
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
