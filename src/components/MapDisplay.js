import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './Marker';
import { getAllOmniEats, currentLocation } from '../store';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.center.lat !== this.props.center.lat ||
      prevProps.center.lat !== this.props.center.lat
    ) {
      this.props.getUserLocation();
      this.props.allOmniEats();
    }
  }

  componentDidMount() {
    this.props.getUserLocation();
    this.props.allOmniEats();
  }

  componentWillUnmount() {
    this.props.allOmniEats();
  }

  render() {
    const { omniEatsRestaurants, center, zoom, imgRef } = this.props;    
    return (
      <div
        style={{
          height: '100vh',
          minWidth: 1198,
          width: '100%',
          marginTop: 25
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{
            key: process.env.MAPKEY || 'AIzaSyA50mDPBaEgfNWestAu7oPjFK85h1rhE88'
          }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {omniEatsRestaurants.map(restaurant => {
            return (
              <Marker
                restaurantId={restaurant.id}
                key={restaurant.id}
                lat={restaurant.latitude}
                lng={restaurant.longitude}
                color={
                  !restaurant.omniRating
                    ? 'blue'
                    : restaurant.omniRating.rating === 'Meat Lovers'
                    ? 'red'
                    : restaurant.omniRating.rating === 'Half-Half'
                    ? 'yellow'
                    : restaurant.omniRating.rating === 'Vegetarian'
                    ? 'green'
                    : 'blue'
                }
                name={restaurant.name}
                googleId={restaurant.googleId}
                omniRating={
                  restaurant.omniRating
                    ? restaurant.omniRating.rating
                    : 'No Votes Yet'
                  }
                  imgRef={restaurant.imgRef}
              />
            );
          })}
        </GoogleMapReact>
      </div>
    );
  }
}

const stateToProps = ({ omniEatsRestaurants, userLocation }) => {
  return {
    omniEatsRestaurants,
    center: userLocation,
    zoom: 15
  };
};

const dispatchToProps = dispatch => {
  return {
    allOmniEats: () => dispatch(getAllOmniEats()),
    getUserLocation: () => dispatch(currentLocation())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(MapDisplay);
