import axios from 'axios'

const ADD_FILTER = "ADD_FILTER"
const REMOVE_FILTER = "REMOVE_FILTER"

const _addFilter = (filter) => {
 return {
   type: ADD_FILTER,
   filter
 }
}

const _removeFilter = (filter) => {
  return {
    type: REMOVE_FILTER,
    filter
  }
}
export const addorRemoveFilter = () => {
  const meaty = document.getElementById('meatyCheck')
  const halfy = document.getElementById('halfCheck')
  const veggy = document.getElementById('veggyCheck')
  return dispatch => {
    if (meaty.checked) {
      dispatch(_addFilter('Meat Lovers'))
    } else {
      dispatch(_removeFilter('Meat Lovers'))
    }
    if (halfy.checked) {
      dispatch(_addFilter('Half-Half'))
     } else {
      dispatch(_removeFilter('Half-Half'))
    }
    if (veggy.checked) {
      dispatch(_addFilter('Vegetarian'))
    } else {
      dispatch(_removeFilter('Vegetarian'))
    }
  }
}

export const filterReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_FILTER:
      state = [...state, action.filter]
      break;
    case REMOVE_FILTER:
      state = state.filter(str => str !== action.filter)
  }
  return state
}
