import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

class Marker extends Component {
    render() {
        if(this.props.text) {
            return <div className="marker">
                {this.props.text}
                <style jsx>{`
                    .marker {
                        background-color: #fff;
                        padding: 1em;
                        display: inline-block;
                        border-radius: 5px;
                        border: 2px solid #aab;
                    }
                `}</style>
            </div>
        } else {
            return <span></span>
        }
    }
}

class GoogleMap extends Component {

  static defaultProps = {
    center: {
      lat: 37.765550,
      lng: -122.447558
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
      if(newLocation) {
        if(!newLocation.place) newLocation.place = null
        // the map doesn't seem to center things very well so we do this
        newLocation.center.lat = newLocation.center.lat - 0.0001
        newLocation.center.lng = newLocation.center.lng + 0.001
        this.setState(newLocation)  
      }
  }

  createMapOptions(maps) {
    return {
        streetViewControl: true,
        streetViewControlOptions: {
            position: google.maps.ControlPosition.LEFT_TOP
        }        
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div className="map" style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyBc4iaq2Er5spX5vi-ZZYcneWfafUu-19E" }}
          options={this.createMapOptions}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          center={this.state.center}
          zoom={this.state.zoom}
        >
            <Marker text={this.state.place}></Marker>
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