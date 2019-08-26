import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
 
const AnyReactComponent = ({ text }) => <div>{text}</div>;
 
class GoogleMap extends Component {
  static defaultProps = {
    center: {
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
 
  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map" style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBc4iaq2Er5spX5vi-ZZYcneWfafUu-19E" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={59.955413}
            lng={30.337844}
            text="My Marker"
          />
        </GoogleMapReact>

        <style jsx>{`
            .map {
                position: absolute;
                top: 0px;
                left: 0px;
            }
        `}</style>
      </div>
    );
  }
}
 
export default GoogleMap;