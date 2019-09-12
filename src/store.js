import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { googleReducer, getMileRestaurants } from './Reducers/googleReducer';

const reducer = combineReducers({
  googleRestaurants: googleReducer,
  loggedInUser: loginReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export {
  getMileRestaurants
}
