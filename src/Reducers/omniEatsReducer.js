import axios from 'axios';

const GET_ALL_OMNIEATS = 'GET_ALL_OMNIEATS';

const _getAllOmniEats = restaurants => {
  return {
    type: GET_ALL_OMNIEATS,
    restaurants
  };
};

export const getAllOmniEats = (filter) => {
  return async dispatch => {
    const response = await axios.post('/api/omniEats', {filter});
    const omniEatsRestaurants = response.data;
    dispatch(_getAllOmniEats(omniEatsRestaurants));
  };
};

export const castVote = (data) => {
  return async dispatch => {
    const response = await axios.post('/api/omniEats/rate', data)
    const omniEatsRestaurants = response.data;
    dispatch(_getAllOmniEats(omniEatsRestaurants))
  }
}

export const omniEatsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_OMNIEATS:
      return action.restaurants;
  }
  return state;
};
