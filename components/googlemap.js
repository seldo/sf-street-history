import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <div className="marker">{text}</div>;

class GoogleMap extends Component {

  static defaultProps = {
    center: {
      lat: 37.772224,
      lng: -122.441153
    },
    zoom: 13
  };

  constructor(props) {
    super(props)
    this.state = {
        center: this.props.center,
        zoom: this.props.zoom
    }
    this.changeTheMap = this.changeTheMap.bind(this)
  }

  changeTheMap(newLocation) {
      this.setState(newLocation)
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map" style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBc4iaq2Er5spX5vi-ZZYcneWfafUu-19E" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.state.center}
          zoom={this.state.zoom}
        >
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