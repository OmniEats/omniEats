import React from 'react';
import Popup from 'reactjs-popup';
import Rating from './Rating';
import { connect } from 'react-redux';
import { getDirections, getRated } from '../store';

const Marker = ({
  name,
  restaurantId,
  color,
  omniRating,
  imgUrl,
  loggedInUser,
  hours,
  grating,
  gUserRatingsTotal,
  loadDirections,
  lat,
  lng,
  userLocation,
  loadRated
}) => {
  const key = process.env.MAPKEY || 'AIzaSyBP8sgCR137j4KQuKiBB-3e8qKmkky3JMk';
  loadRated();

  return (
    <Popup
      trigger={
        <div
          className="marker"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        ></div>
      }
      on="hover"
      mouseLeaveDelay={200}
    >
      <div
        style={{
          alignContent: 'center',
          backgroundColor: 'black',
          color: 'white'
        }}
      >
        <div style={{ fontSize: 16 }}>{name}</div>
        {hours ? (
          <div style={{ fontSize: 14, color: 'green' }}>{'Open'}</div>
        ) : (
          <div style={{ fontSize: 13, color: 'red' }}>{'Closed'}</div>
        )}
        <div style={{ fontSize: 14, color: 'lightgrey' }}>
          Google Rating: {grating} ({gUserRatingsTotal})
        </div>
        <div>OmniRating:{omniRating}</div>
        <div style={{ cursor: 'pointer' }}>
          <Rating restaurantId={restaurantId} />
        </div>
        <div>
          <button
            type="button"
            onClick={() => {
              loadDirections(userLocation, { lat, lng })
            }}
          >
            Directions
          </button>
        </div>
        <div>
          {!loggedInUser.id && (
            <div style={{ color: 'white' }}>Must Log In to Rate Restaurant</div>
          )}
        </div>
        <Popup
          trigger={<img width="188" height="188" src={imgUrl} />}
          position="right center"
          on="hover"
        >
          <img width="500" height="500" src={imgUrl} />
        </Popup>
      </div>
    </Popup>
  );
};

const stateToProps = ({ loggedInUser, userLocation, directions }) => {
  return {
    loggedInUser,
    userLocation,
    directions
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
)(Marker);
