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
    this.changePosition = this.changePosition.bind(this);
    this.mapClicked = this.mapClicked.bind(this);
  }
  changePosition(position) {
    this.setState({
      positiongeo: position
    });
  }

  // searchNearby(map, center) {
  //   const {google} = this.props;
  //   const service = new google.maps.places.PlacesService(map);
  //   // Specify location, radius and place types for your Places API search.
  //   const request = {
  //      location: center,
  //      radius: '500',
  //      type: ['food']
  //    };

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
    console.log('clicked map', props);
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      });
    }
  }
  mapClicked = (mapProps, map, clickEvent) => {
    console.log('mapclicked', clickEvent);
  };

  getProps = e => {
    e.preventDefault();
    console.log('click', this.state.positiongeo);
  };

  render() {
    return (
      <div className="maps">
        <div>
          <form className="navbar-form navbar-left" role="search">
            <div className="form-group">
              <Geolocation changePosition={this.changePosition} />
              <input type="text" placeholder="Location" />
              <button type="submit">Submit</button>
              <button type="submit" onClick={this.getProps}>
                Get Current Location
              </button>
            </div>
          </form>
        </div>
        <Map
          google={this.props.google}
          style={{ width: '60vw', height: '100vh', position: 'relative' }}
          initialCenter={{
            lat: 33.976,
            lng: -118.39
          }}
          zoom={15}
          onClick={this.onMapClicked}
          onClick={this.mapClicked}
        >
          {/* {props.markers.map(marker => (
          <Marker
            position={{ lat: marker.latitude, lng: marker.longitude }}
            key={marker.id}
          />
        ))} */}
          {this.state.positiongeo ? (
            <Marker
              onClick={this.onMarkerClick}
              icon={{
                url:
                  'http://www.clker.com/cliparts/B/B/1/E/y/r/marker-pin-google.svg',
                scaledSize: new google.maps.Size(36, 36)
              }}
              name={'Your Position'}
              position={{
                lat: this.state.positiongeo.coords.latitude,
                lng: this.state.positiongeo.coords.longitude
              }}
            />
          ) : null}
          <Marker
            onClick={this.onMarkerClick}
            name={'Elberts House'}
            position={{ lat: 33.759703, lng: -118.428093 }}
          />
          <Marker />
          <Marker onClick={this.onMarkerClick} name={'Hack Reactor Nation'} />
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
