import  axios  from 'axios';

const GET_DIRECTIONS = "GET_DIRECTIONS"

const _getDirections = directions => {
  return {
    type: GET_DIRECTIONS,
    directions
  }
}

export const getDirections = (origin, destination) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/google/directions', {origin, destination})
      dispatch(_getDirections(response.data))
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const directionsReducer = (state = {}, action) => {
  switch(action.type) {
    case GET_DIRECTIONS:
      return action.directions
  }

  return state
}
