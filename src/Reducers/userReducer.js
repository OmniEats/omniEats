import { _catchError } from './errorReducer'
import axios from 'axios'
// User Actions
const CREATE_USER = 'CREATE_USER';

const _createUser = user => {
  return {
    type: CREATE_USER,
    user
  };
};

export const createUser = user => {
  console.log("Got Here")
  return async dispatch => {
    try {
      const response = await axios.post('/api/users', user);
      dispatch(_createUser(response.data));
    } catch (ex) {
      dispatch(_catchError(ex.response.data));
    }
  };
};

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_USER:
      return action.user;
  }
  return state;
};
