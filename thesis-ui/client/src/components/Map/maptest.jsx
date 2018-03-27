import React, { Component } from 'react';
const _ = require("lodash");
const { compose, withProps, lifecycle, withStateHandlers } = require("recompose");
import Geolocation from './geolocation.jsx';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete'


const {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
} = require("react-google-maps");
const { SearchBox } = require("react-google-maps/lib/components/places/SearchBox");

const MapWithASearchBox = compose(
  withStateHandlers(() => ({
    count: 0,
  }), {
    onClick: ({ count }) => () => ({
      count: count + 1,
    })
  }),
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBl4meuMNIFaMJDzAdWR_aCpOzafVTS1ug&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `200px` }} />,
    containerElement: <div style={{ height: `200px` }} />,
    mapElement: <div style={{ height: `200px` }} />,
  }),
  lifecycle({
    componentWillMount() {
      const refs = {}

      this.setState({
        bounds: null,
        center: {
          lat: 33.9, lng: -118.39
        },
        markers: [],
        onMapMounted: ref => {
          refs.map = ref;
        },
        onMarkerRightClick: () => {
          markers=this.state.markers;
        },
        onBoundsChanged: () => {
          this.setState({
            bounds: refs.map.getBounds(),
            center: refs.map.getCenter(),
          })
        },
        onSearchBoxMounted: ref => {
          refs.searchBox = ref;
        },
        onPlacesChanged: () => {
          const places = refs.searchBox.getPlaces();
          const bounds = new google.maps.LatLngBounds();

          places.forEach(place => {
            console.log('the place is', place.formatted_address);
            geocodeByAddress(place.formatted_address)
  .then(results => getLatLng(results[0]))
  .then(({ lat, lng }) => console.log('Successfully got latitude and longitude', { lat, lng }))
  
            if (place.geometry.viewport) {
              bounds.union(place.geometry.viewport)
            } else {
              bounds.extend(place.geometry.location)
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
      })
    },
  }),
  withScriptjs,
  withGoogleMap
)(props =>
  <GoogleMap
    ref={props.onMapMounted}
    defaultZoom={15}
    center={props.center}
    onBoundsChanged={props.onBoundsChanged}
  >
    <Geolocation />
            <button onClick={props.onClick} type="submit">Get {props.count}</button>
    <SearchBox
      ref={props.onSearchBoxMounted}
      bounds={props.bounds}
      controlPosition={google.maps.ControlPosition.TOP_LEFT}
      onPlacesChanged={props.onPlacesChanged}
    >
      <input
        type="text"
        placeholder="Customized your placeholder"
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
    </SearchBox>
    
    {props.markers.map((marker, index) =>
      <Marker key={index} position={marker.position} />
    )}
  </GoogleMap>
);


export default class MyFancyMap extends React.PureComponent {
  render() {
      return (
          // <StyledMapWithAnInfoBox />
          <MapWithASearchBox/>
      )
  }
}