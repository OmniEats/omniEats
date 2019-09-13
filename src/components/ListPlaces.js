import React from 'react';
import { connect } from 'react-redux';
import Popup from 'reactjs-popup'
import MapDisplay from './MapDisplay';
import { MDBIcon } from 'mdbreact';
import { getMileRestaurants } from '../store';

class ListPlaces extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedRestaurant: '',
      lng: -121,
      lat: 36
    };
    this.currentLocation = this.currentLocation.bind(this);
    this.setLocation = this.setLocation.bind(this);
    this.onSelectChange = this.onSelectChange.bind(this)
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

  onSelectChange(ev) {
    this.setState({selectedRestaurant: ev.target.value})
  }

  render() {
    const { currentLocation, onSelectChange} = this;
    const { lng, lat, selectedRestaurant } = this.state;
    const { googleRestaurants } = this.props;
    console.log(selectedRestaurant)
    return (
      <div>
        <div>
          <button onClick={() => currentLocation()} style={{ marginTop: 90 }}>
            Get Nearby Restaurants
          </button>
          <Popup trigger={<button>Omnivore Rating</button>} position="bottom center">
              
          </Popup>
          
          {googleRestaurants.length > 0 ? (
            <div>
              <ul>
                {googleRestaurants.map(restaurant => (
                  <li key={restaurant.id} style={{ color: '#fff' }}>
                    {restaurant.name}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
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
