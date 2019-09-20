import React from 'react';
import Popup from 'reactjs-popup';
import Rating from './Rating'
import { connect } from 'react-redux'

const Marker = ({name, restaurantId, color, omniRating, imgRef, loggedInUser, hours, grating, gUserRatingsTotal}) => {
  let currentImg = "https://maps.googleapis.com/maps/api/place/photo?photoreference=" + imgRef + "&sensor=false&maxheight=500&maxwidth=500&key=" + (process.env.MAPKEY || "AIzaSyA50mDPBaEgfNWestAu7oPjFK85h1rhE88")
  return (
    <Popup
      trigger={
        <div
          className="marker"
          style={{ backgroundColor: color, cursor: 'pointer' }}
          title={name}
        >
        </div>
      }
      on='hover'
      mouseLeaveDelay={2000}
    >
      <div style={{alignContent:"center", backgroundColor: 'black', color: 'white'}}>
        <div style={{ fontSize: 16 }}>{name}</div>
        {hours ? <div style={{ fontSize: 14, color: 'green' }}>{'Open'}</div>:
        <div style={{ fontSize: 13, color: 'red' }}>{'Closed'}</div>}
        <div style={{ fontSize: 14, color: 'lightgrey' }}>Google Rating: {grating} ({gUserRatingsTotal})</div>
        <div>OmniRating:{omniRating}</div>
        <div style={{ cursor: 'pointer' }}><Rating restaurantId={restaurantId} /></div>
        <div>{!loggedInUser.id && <div style={{ color: "white"}}>Must Log In to Rate Restaurant</div>}</div>
        <Popup
            trigger={<img width='188' height='188' src={currentImg} />}
            position="right center"
            on="hover"
        >
        <img width='500' height='500' src={currentImg} />
        </Popup>
      </div>
    </Popup>
  );
};

const stateToProps = ({loggedInUser}) => {
  return {
    loggedInUser
  }
}

export default connect(stateToProps)(Marker);
