import React from 'react';
import Popup from 'reactjs-popup';

const Marker = props => {
  const { color, name, key, lat, lng } = props;

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
      </div>
    </Popup>
  );
};

export default Marker;
