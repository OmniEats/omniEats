import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addorRemoveFilter } from '../Reducers/filterReducer';

function SideBar({ setFilter }) {
  return (
    <div className="category-container" style={{width: 162, color: '#fff'}}>
      <div style={{fontWeight: 'bold', fontSize: 20, marginBottom: 20}}>Categories</div>
      <label htmlFor="meatyCheck">
        Meat Lovers:
        <input style={{position: 'absolute', left: 125}}
          type="checkbox"
          id="meatyCheck"
          name="meatyCheck"
          onChange={() => setFilter()}
        />
      </label>
      <br />
      <label htmlFor="halfyCheck">
        Half-Half:
        <input style={{position: 'absolute', left: 125}}
          type="checkbox"
          id="halfCheck"
          name="halfCheck"
          onChange={() => setFilter()}
        />
      </label>
      <br />
      <label htmlFor="veggyCheck">
        Vegetarian:
        <input style={{position: 'absolute', left: 125}}
          type="checkbox"
          id="veggyCheck"
          name="veggyCheck"
          onChange={() => setFilter()}
        />
      </label>
    </div>
  );
}

const dispatchToProps = dispatch => {
  return {
    setFilter: () => dispatch(addorRemoveFilter())
  };
};

export default connect(
  null,
  dispatchToProps
)(SideBar);
