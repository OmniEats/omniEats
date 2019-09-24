import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { googleReducer, getMileRestaurants } from './Reducers/googleReducer';
import { loginReducer, loginUser, logoutUser } from './Reducers/loginReducer'
import { userReducer, createUser } from './Reducers/userReducer'
import { errorReducer, _catchError } from './Reducers/errorReducer'
import { omniEatsReducer, getAllOmniEats, castVote, getSlider, getRated } from './Reducers/omniEatsReducer';
import { userLocationReducer, currentLocation } from './Reducers/userLocationReducer';
import { filterReducer, addorRemoveFilter } from './Reducers/filterReducer';
import { directionsReducer, getDirections } from './Reducers/directionsReducer'

const reducer = combineReducers({
  googleRestaurants: googleReducer,
  loggedInUser: loginReducer,
  user: userReducer,
  error: errorReducer,
  omniEatsRestaurants: omniEatsReducer,
  userLocation: userLocationReducer,
  filters: filterReducer,
  directions: directionsReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export {
  getMileRestaurants,
  loginUser,
  logoutUser,
  createUser,
  _catchError,
  getAllOmniEats,
  castVote,
  currentLocation,
  addorRemoveFilter,
  getDirections,
  getSlider,
  getRated
}
