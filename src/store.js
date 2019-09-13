import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { googleReducer, getMileRestaurants } from './Reducers/googleReducer';
import { loginReducer, loginUser, logoutUser } from './Reducers/loginReducer'
import { userReducer, createUser } from './Reducers/userReducer'
import { errorReducer, _catchError } from './Reducers/errorReducer'

const reducer = combineReducers({
  googleRestaurants: googleReducer,
  loggedInUser: loginReducer,
  user: userReducer,
  error: errorReducer

});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;

export {
  getMileRestaurants,
  loginUser,
  logoutUser,
  createUser,
}
