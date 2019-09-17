import React from 'react';
import Popup from 'reactjs-popup';
import Rating from './Rating'

const Marker = ({name, lat, lng, restaurantId, color, omniRating, imgRef}) => {
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
      <div style={{backgroundColor: 'black', color: 'white'}}>
        <div style={{ fontSize: 16 }}>{name}</div>
        <div>OmniRating:{omniRating}</div>
        <div style={{ cursor: 'pointer' }}><Rating restaurantId={restaurantId} /></div>
        <img src={"https://maps.googleapis.com/maps/api/place/photo?photoreference=" + imgRef + "&sensor=false&maxheight=180&maxwidth=180&key=" + (process.env.MAPKEY || "AIzaSyA50mDPBaEgfNWestAu7oPjFK85h1rhE88" } />
      </div>
    </Popup>
  );
};

export default Marker;
