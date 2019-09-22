import React from 'react';
import { connect } from 'react-redux';
import { castVote } from '../store';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: ''
    };
    this.onSelectChange = this.onSelectChange.bind(this);
  }
  onSelectChange(ev) {
    this.setState({ vote: ev.target.value });
  }

  render() {
    const { vote } = this.state;
    const { onSelectChange } = this;
    const { makeVote, restaurantId, loggedInUser } = this.props;
    return (
      <div>
        <select defaultValue={'Meat Lovers'} onChange={onSelectChange}>
          <option value="Meat Lovers">Meat Lovers</option>
          <option value="Half-Half">Half-Half</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>
        <button
          type="submit"
          disabled={!loggedInUser.id ? true : false}
          onClick={ev => {
            ev.preventDefault();
            makeVote({ restaurantId, vote });
          }}
        >
          Rate Restaurant
        </button>
      </div>
    );
  }
}

const stateToProps = ({ loggedInUser }) => {
  return {
    loggedInUser
  };
};

const dispatchToProps = dispatch => {
  return {
    makeVote: data => dispatch(castVote(data))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Rating);
