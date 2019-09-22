import React from 'react';
import Rating from './Rating';
import { connect } from 'react-redux';
import { getDirections } from '../store';
import Sidebar from './SideBar';

const Restaurants = ({
  loggedInUser,
  omniEatsRestaurants,
  loadDirections,
  userLocation
}) => {
  return (
    <div style={{ marginLeft: 162, alignContent: 'center' }}>
      <br />
      <br />
      <br />
      <ul className="restaurantList">
        {omniEatsRestaurants.map(restaurant => {
          return (
            <li key={restaurant.id} style={{ marginRight: 65, marginLeft: 30 }}>
              <div style={{ fontSize: 18, color: 'white' }}>
                {restaurant.name}
              </div>
              {restaurant.hours ? (
                <div style={{ fontSize: 16, color: 'green' }}>{'Open'}</div>
              ) : (
                <div style={{ fontSize: 15, color: 'red' }}>{'Closed'}</div>
              )}
              <div style={{ fontSize: 16, color: 'lightgrey' }}>
                Google Rating: {restaurant.grating} (
                {restaurant.gUserRatingsTotal})
              </div>
              <div>
                OmniRating:{' '}
                {restaurant.omniRating
                  ? restaurant.omniRating.rating
                  : 'No Rating Yet'}
              </div>
              <div style={{ cursor: 'pointer' }}>
                <Rating restaurantId={restaurant.id} />
              </div>
              <div>
                {!loggedInUser.id && (
                  <div style={{ color: 'white' }}>
                    Must Log In to Rate Restaurant
                  </div>
                )}
                <img width="300" height="300" src={restaurant.imgUrl} />
              </div>
              <br />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const stateToProps = ({
  loggedInUser,
  userLocation,
  directions,
  omniEatsRestaurants
}) => {
  return {
    loggedInUser,
    userLocation,
    directions,
    omniEatsRestaurants
  };
};

const dispatchToProps = dispatch => {
  return {
    loadDirections: (origin, destination) =>
      dispatch(getDirections(origin, destination))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Restaurants);
