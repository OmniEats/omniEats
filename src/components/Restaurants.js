import React from 'react';
import Rating from './Rating';
import { connect } from 'react-redux';
import { getDirections, getRated } from '../store';
import { NavLink } from 'react-router-dom';
import Popup from 'reactjs-popup';

const Restaurants = ({
  loggedInUser,
  omniEatsRestaurants,
  loadDirections,
  userLocation,
  loadRated
}) => {
  loadRated();
  return (
    <div>
      <br />
      <br />
      <br />
      <ul className="restaurantList">
        {omniEatsRestaurants.map(restaurant => {
          let lat = restaurant.latitude;
          let lng = restaurant.longitude;
          return (
            <li
              key={restaurant.id}
              style={{
                margin: 'auto',
                border: '1px solid lightgrey',
                padding: 15
              }}
            >
              <div style={{ fontSize: 20, color: 'white' }}>
                {restaurant.name}
              </div>
              {restaurant.hours ? (
                <div style={{ color: 'green' }}>{'Open'}</div>
              ) : (
                <div style={{ color: 'red' }}>{'Closed'}</div>
              )}
              <div style={{ color: 'white' }}>{restaurant.vicinity}</div>
              <div style={{ color: 'white' }}>
                Google Rating: {restaurant.grating} (
                {restaurant.gUserRatingsTotal})
              </div>
              <div style={{ color: 'white' }}>
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
                <Popup
                  trigger={
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          loadDirections(userLocation, { lat, lng });
                        }}
                      >
                        Directions
                      </button>
                    </div>
                  }
                  position="left center"
                  closeOnDocumentClick
                >
                  <div style={{ backgroundColor: '#333' }}>
                    <NavLink className="navlink" exact to="/">
                      View Route on Map
                    </NavLink>
                  </div>
                </Popup>
              </div>
              <div>
                <img
                  style={{ border: '1px solid black' }}
                  src={restaurant.imgUrl}
                  width="400"
                  height="400"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const stateToProps = ({
  omniEatsRestaurants,
  loggedInUser,
  userLocation,
  directions
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
      dispatch(getDirections(origin, destination)),
    loadRated: () => dispatch(getRated())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Restaurants);
