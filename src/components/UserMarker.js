import React from 'react';
import { connect } from 'react-redux';

const UserMarker = ({filters}) => {
  const color = (filters) => {
     if (filters.includes('Meat Lovers') && !filters.includes('Vegetarian')) {
      return 'red';
    } else if (filters.includes('Vegetarian') && !filters.includes('Meat Lovers')) {
      return 'green';
    } else if (filters.includes('Half-Half')) {
      return 'yellow';
    }
    return 'white';
  } 

  return (
    <div style={{
      position: 'absolute',
      width: 40,
      height: 40,
      left: -20,
      top: -20 / 2,
      border: '5px solid black',
      borderRadius: 40,
      backgroundColor: color(filters),
      textAlign: 'center',
      color: '#3f51b5',
      fontSize: 16,
      fontWeight: 'bold',
      padding: 4
    }}>
      Me
    </div>
  )
}

const mapStateToProps = ({filters}) => {
  return { filters }
};

export default connect (mapStateToProps)(UserMarker);
