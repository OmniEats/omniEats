import React from 'react';
import Popup from 'reactjs-popup';
import Rating from './Rating'

const Marker = ({name, lat, lng, restaurantId, color}) => {
  return (
    <Popup
      trigger={
        <div
          className="marker"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        />
      }
      position="right center"
    >
      <div>
        <div>{name}</div>
        <div>lat: {lat}</div>
        <div>lng: {lng}</div>
        <div>OmniRating: { }</div>
        <Rating restaurantId={restaurantId} />
      </div>
    </Popup>
  );
};

export default Marker;
