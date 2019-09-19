import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './Marker';
import { getAllOmniEats, currentLocation } from '../store';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, ) {
    const {filters} = this.props
    console.log(prevProps)
    if (
      prevProps.center.lat !== this.props.center.lat ||
      prevProps.center.lng !== this.props.center.lng ||
      prevProps.filters.length !== this.props.filters.length
    ) {
      this.props.getUserLocation();
      this.props.allOmniEats(filters);
    }
  }

  componentDidMount() {
    const { filters } = this.props
    this.props.getUserLocation();
    this.props.allOmniEats(filters);
  }

  componentWillUnmount() {
    const { filters } = this.props
    this.props.allOmniEats(filters);
  }

  render() {
    const { filters } = this.props
    const { omniEatsRestaurants, center, zoom } = this.props;
    console.log(filters)
    return (
      <div
        style={{
          height: '100vh',
          minWidth: 1198,
          width: '100%',
          marginTop: 85,
          marginLeft: 162
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

const stateToProps = ({ omniEatsRestaurants, userLocation, filters }) => {
  return {
    omniEatsRestaurants,
    center: userLocation,
    zoom: 15,
    filters
  };
};

const dispatchToProps = dispatch => {
  return {
    allOmniEats: filter => dispatch(getAllOmniEats(filter)),
    getUserLocation: () => dispatch(currentLocation())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(MapDisplay);
