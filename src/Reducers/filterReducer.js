import axios from 'axios'

const GET_ALL_FILTERS = 'GET_ALL_FILTERS'

const _getAllFilters = (filters) => {
  return {
    type: GET_ALL_FILTERS,
    filters
  }
}

export const getAllFilters = () => {
  
}

export const filterReducer = (state = [], action) => {
  switch(action.type) {
    case GET_ALL_FILTERS:
      state = [...action.filters]
      break;
    case ADD_FILTER:
      state = [...state, action.filter]
  }
  return state
}
