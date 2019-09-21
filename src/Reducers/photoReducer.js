import axios from 'axios'

const GET_PHOTO = 'GET_PHOTO'

const _getPhoto = query => {
  return {
    type: GET_PHOTO,
    query
  }
}

const getPhoto = query => {
  return async dispatch => {
    const reponse = await axios('/api/google/photos')
  }
}

const photoReducer
