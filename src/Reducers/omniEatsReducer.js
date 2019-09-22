import axios from 'axios';

const GET_ALL_OMNIEATS = 'GET_ALL_OMNIEATS';
const GET_SLIDER = 'GET_SLIDER';

const _getAllOmniEats = restaurants => {
  return {
    type: GET_ALL_OMNIEATS,
    restaurants
  };
};

const _getSlider = percent => {
  return {
    type: GET_SLIDER,
    percent
  }
}

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

export const getSlider = (percent) => {
  return async dispatch => {
    const response = await axios.post('/api/omniEats/slider', percent);
    const filtered = response.data;
    dispatch(_getSlider(filtered));
  }
}

export const omniEatsReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ALL_OMNIEATS:
      return action.restaurants;
    case GET_SLIDER:
      return action.percent;
  }
  return state;
};
