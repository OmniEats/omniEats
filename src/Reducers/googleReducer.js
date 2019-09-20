import axios from 'axios'

//Actions

const GET_MILE_RESTAURANTS = "GET_MILE_RESTAURANT"

const _getMileRestaurants = restaurants => {
  return {
    type: GET_MILE_RESTAURANTS,
    restaurants
  }
}

export const getMileRestaurants = (userLocation) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/google', userLocation)
      dispatch(_getMileRestaurants(response.data))
    } catch (ex) {
      console.error(ex.message)
    }
  }
}

export const getDirections = (origin, destination) => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/google/directions', {origin, destination})
      console.log(response.data)
    } catch (ex) {
      console.log(ex)
    }
  }
}

export const googleReducer = (state = [], action) => {
  switch (action.type) {
    case GET_MILE_RESTAURANTS:
      return action.restaurants
  }
  return state
}
