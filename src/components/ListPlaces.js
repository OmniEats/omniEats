import React from 'react';
import { connect } from 'react-redux';
import MapDisplay from './MapDisplay';
import { MDBIcon } from 'mdbreact';
import { getMileRestaurants } from '../store';

class ListPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lng: -121,
      lat: 36
    };
    this.currentLocation = this.currentLocation.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }
  currentLocation() {
    const { setLocation } = this;
    const { getGoogleRestaurants } = this.props;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        setLocation(location);
        getGoogleRestaurants(location);
      });
    } else {
      console.error('Device Not Compatible Must have a GPS module');
    }
  }

  setLocation(location) {
    this.setState({
      lat: location.latitude,
      lng: location.longitude
    });
  }

  render() {
    const { currentLocation } = this;
    const { lng, lat } = this.state;
    return (
      <div>
        <div>
          <button type="button" onClick={() => currentLocation()} style={{ marginTop: 90 }}>
            Get Nearby Restaurants
          </button>
        </div>
        <MapDisplay center={{ lat, lng }} />
      </div>
    );
  }
}
const stateToProps = ({ googleRestaurants }) => {
  return {
    googleRestaurants
  };
};

const dispatchToProps = dispatch => {
  return {
    getGoogleRestaurants: userLocation =>
      dispatch(getMileRestaurants(userLocation))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(ListPlaces);
