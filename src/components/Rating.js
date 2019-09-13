import React from "react";
import { connect } from "react-redux";

class Rating extends React.Component {
    constructor(props) {
        super(props)
    } 
  render() {
    return (
      <div>
        <select defaultValue={"No Data"} onChange={onSelectChange}>
          {googleRestaurants.map(restaurant => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>
    );
  }
}

const stateToProps = ({ googleRestaurants }) => {
  return {
    googleRestaurants
  };
};

export default connect(stateToProps)(Rating);
