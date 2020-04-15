import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

class SimpleMap extends Component {


  static defaultProps = {
    center: {
      lat: this.props.lat,
      lng: this.props.long
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: /* YOUR KEY HERE */ }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <AnyReactComponent
            lat={latitude}
            lng={longitude}
            text="Current Parts Crib Location"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;