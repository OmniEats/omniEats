import { getMileRestaurants } from '../store'

const initState = {
  location: { lat: -121, lng: 36 }
};

const SET_LOCATION = 'SET_LOCATION';

const _currentLocation = location => {
  return {
    type: SET_LOCATION,
    location
  };
};

export const currentLocation = () => {
  return dispatch => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(pos) {
        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude
        };
        dispatch(_currentLocation({lat: location.latitude, lng: location.longitude}))
        dispatch(getMileRestaurants(location))
      });
    } else {
      console.error('Device Not Compatible Must have a GPS module');
    }
  };
};

export const userLocationReducer = (state = initState, action) => {
   switch(action.type) {
     case SET_LOCATION:
       state = {...state, lat: action.location.lat, lng: action.location.lng}
       break;
     default: return state
   }
   return state
}
