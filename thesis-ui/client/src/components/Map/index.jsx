import React, { Component } from 'react';
import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import Search from '../Navbar/Search.jsx';
import Geolocation from './geolocation.jsx';
import { connect } from 'react-redux';

const style = {
  width: '100%',
  height: '100%'
};
export class MapContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {}
    };
    this.onMarkerClick = this.onMarkerClick.bind(this);
    this.onMapClicked = this.onMapClicked.bind(this);
    this.changePosition = this.changePosition.bind(this)
  }
  changePosition(position){
    console.log('got it', position)
    this.setState({
      positiongeo: position
    })
  }
  renderMarkers() {}
  onMarkerClick(props, marker, e) {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  }

  fetchPlaces = (mapProps, map) => {
    const { google } = mapProps;
    const service = new google.maps.places.PlacesService(map);
  };

  onMapClicked(props) {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  getProps = (e) => {
    e.preventDefault()
    console.log('this one is', this.state.positiongeo);
  }
  render() {
    return (
      <div className="maps">
        <div>
        <form className="navbar-form navbar-left" role="search">
          <div className="form-group">
          <Geolocation changePosition={this.changePosition}/>
          {console.log('the position is', this.state.position)}
            <input type="text" placeholder="Location" />
            <button type="submit">Submit</button>
            <button type="submit" onClick={this.getProps}>Get Current Location</button>
          </div>
        </form>
      </div>
      <Map
        google={this.props.google}
        style={{ width: '40%', height: '60%', position: 'relative' }}
        initialCenter={{
          lat: 33.976,
          lng: -118.39
        }}
        zoom={15}
        onClick={this.onMapClicked}
      >
        {/* {props.markers.map(marker => (
          <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            key={marker.id}
          />
        ))} */}
        {this.state.positiongeo ?
        <Marker
          onClick={this.onMarkerClick}
          name={'Your Position'}
          position={{ lat: this.state.positiongeo.coords.latitude, lng: this.state.positiongeo.coords.longitude }}
        /> : null
      }
        <Marker
          onClick={this.onMarkerClick}
          name={'Elberts House'}
          position={{ lat: 33.759703, lng: -118.428093 }}
        />
        <Marker />
        <Marker 
          onClick={this.onMarkerClick} 
          name={'Hack Reactor Nation'} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
        >
          <div>
            <small>{this.state.selectedPlace.name}</small>
          </div>
        </InfoWindow>
      </Map>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    positiongeo: state.positiongeo
  };
}
// export connect(mapStateToProps)(MapContainer)

export default GoogleApiWrapper({
  apiKey: 'AIzaSyBZMS-V-GnSmcKvt_HKD4nRoajBRMm05CE'
})(MapContainer);
