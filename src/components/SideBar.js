import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { addorRemoveFilter } from '../Reducers/filterReducer';

function SideBar({ setFilter }) {
  return (
    <div style={{ marginTop: 90, width: 162 }}>
      Categories
      <br />
      <NavLink to="/meat">Meat</NavLink>
      <br />
      <NavLink to="/mixed">Mixed</NavLink>
      <br />
      <NavLink to="/veggie">Veggie</NavLink>
      <label htmlFor="meatyCheck">
        Meat Lovers:
        <input
          type="checkbox"
          id="meatyCheck"
          name="meatyCheck"
          onChange={() => setFilter()}
        />
      </label>
      <label htmlFor="halfyCheck">
        Half-Half:
        <input
          type="checkbox"
          id="halfCheck"
          name="halfCheck"
          onChange={() => setFilter()}
        />
      </label>
      <label htmlFor="veggyCheck">
        Vegetarian:
        <input
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
