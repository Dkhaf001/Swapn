import React, { Component } from 'react';

const _ = require('lodash');
const {
  compose, withProps, lifecycle, withStateHandlers,
} = require('recompose');

import Geolocation from './geolocation.jsx';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

const {
  withScriptjs, withGoogleMap, GoogleMap, Marker,
} = require('react-google-maps');
const { SearchBox } = require('react-google-maps/lib/components/places/SearchBox');

const MapWithASearchBox = compose(
  withStateHandlers(
    () => ({
      count: 0,
    }),
    {
      onClick: (position) => {
        this.setState({
          positiongeo: position,
        });
      },

      // changePosition(position){
      //   console.log('got it', position)
      //   this.setState({
      //     positiongeo: position
      //   })
      // }
    },
  ),
  withProps({
    googleMapURL:
      'https://maps.googleapis.com/maps/api/js?key=AIzaSyBl4meuMNIFaMJDzAdWR_aCpOzafVTS1ug&v=3.exp&libraries=geometry,drawing,places',
    loadingElement: <div style={{ height: '300px', width: '400px' }} />,
    containerElement: <div style={{ height: '300px', width: '400px' }} />,
    mapElement: <div style={{ height: '300px', width: '400px' }} />,
  }),
  lifecycle({
    componentWillMount() {
      console.log('mount');
      const lat = parseFloat(localStorage.getItem('latitude'));
      const long = parseFloat(localStorage.getItem('longitude'));
      // console.log('lat is', lat, 'type of...', typeof lat)
      const refs = {};

      this.setState({
        bounds: null,
        center: parseFloat(localStorage.getItem('latitude'))
          ? {
            lat: parseFloat(localStorage.getItem('latitude')),
            lng: parseFloat(localStorage.getItem('longitude')),
          }
          : {
            lat: 33.9,
            lng: -118.39,
          },
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onMarkerRightClick: () => {
          markers = this.state.markers;
        },
        // this bounds change makes dragging the map extremely choppy
        //-------------------------------------------------------------------
        // onBoundsChanged: () => {
        //   this.setState({
        //     bounds: refs.map.getBounds(),
        //     center: refs.map.getCenter(),
        //   })
        // },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach((place) => {
            geocodeByAddress(place.formatted_address)
              .then(results => getLatLng(results[0]))
              .then(({ lat, lng }) =>
                console.log('Successfully got latitude and longitude', { lat, lng }));

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      });
    },
    componentDidMount() {
      console.log('update');
      const lat = parseFloat(localStorage.getItem('latitude'));
      const long = parseFloat(localStorage.getItem('longitude'));
      // console.log('lat is', lat, 'type of...', typeof lat)
      const refs = {};

      this.setState({
        bounds: null,
        center: parseFloat(localStorage.getItem('latitude'))
          ? {
            lat: parseFloat(localStorage.getItem('latitude')),
            lng: parseFloat(localStorage.getItem('longitude')),
          }
          : {
            lat: 33.9,
            lng: -118.39,
          },
        markers: [],
        onMapMounted: (ref) => {
          refs.map = ref;
        },
        onMarkerRightClick: () => {
          markers = this.state.markers;
        },
        // this bounds change makes dragging the map extremely choppy
        //-------------------------------------------------------------------
        // onBoundsChanged: () => {
        //   this.setState({
        //     bounds: refs.map.getBounds(),
        //     center: refs.map.getCenter(),
        //   })
        // },
        onSearchBoxMounted: (ref) => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach((place) => {
            console.log('what is this', place.formatted_address);
            console.log('what is that', place);
            geocodeByAddress(place.formatted_address)
              .then(results => getLatLng(results[0]))
              .then(({ lat, lng }) =>
                console.log('Successfully got latitude and longitude', { lat, lng }));

            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
          const nextMarkers = places.map(place => ({
            position: place.geometry.location,
          }));
          const nextCenter = _.get(nextMarkers, '0.position', this.state.center);

          this.setState({
            center: nextCenter,
            markers: nextMarkers,
          });
          // refs.map.fitBounds(bounds);
        },
      });
    },
  }),
  withScriptjs,
  withGoogleMap,
)(props => (
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <Geolocation />
    <button onClick={props.onClick} type="submit">
      Get {props.count}
    </button>
    {/* <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Search Location"
        style={{
          boxSizing: `border-box`,
          border: `1px solid transparent`,
          width: `240px`,
          height: `32px`,
          marginTop: `27px`,
          padding: `0 12px`,
          borderRadius: `3px`,
          boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
          fontSize: `14px`,
          outline: `none`,
          textOverflow: `ellipses`,
        }}
      />
    </SearchBox> */}
    {localStorage.getItem('longitude') ? (
      <Marker
        // onClick={this.onMarkerClick}
        icon={{
          url:
            'http://www.clker.com/cliparts/4/4/4/f/12422388151474571261Bronze_circle.svg.thumb.png',
          scaledSize: new google.maps.Size(36, 36),
        }}
        name={'Your Position'}
        position={{
          lat: parseFloat(localStorage.getItem('latitude')),
          lng: parseFloat(localStorage.getItem('longitude')),
        }}
      />
    ) : null}
    {props.markers.map((marker, index) => <Marker key={index} position={marker.position} />)}
  </GoogleMap>
));

export default class MyFancyMap extends React.PureComponent {
  render() {
    return (
      // <StyledMapWithAnInfoBox />
      <MapWithASearchBox />
    );
  }
}
