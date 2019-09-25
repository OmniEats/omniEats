import React from 'react';
import { connect } from 'react-redux';
import { castVote, getRated } from '../store';

class Rating extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vote: 'Meat Lovers'
    };
    this.onSelectChange = this.onSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onSelectChange(ev) {
    this.setState({ vote: ev.target.value });
  }

  onClick(ev){
    ev.preventDefault();
    const { restaurantId, makeVote, sendRest } = this.props;
    const { vote } = this.state;
    makeVote({restaurantId, vote});
  }

  render() {
    const { onSelectChange, onClick } = this;
    const { loggedInUser } = this.props;
    return (
      <div>
        <select defaultValue='Meat Lovers' onChange={onSelectChange}>
          <option value="Meat Lovers">Meat Lovers</option>
          <option value="Half-Half">Half-Half</option>
          <option value="Vegetarian">Vegetarian</option>
        </select>
        <button
          type="submit"
          disabled={!loggedInUser.id ? true : false}
          onClick={onClick}
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
    makeVote: data => dispatch(castVote(data)),
    sendRest: () => dispatch(getRated())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Rating);
