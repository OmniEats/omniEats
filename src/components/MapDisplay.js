import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux'
import Marker from './Marker';
import { getAllOmniEats } from '../store';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center,
      zoom: 7,
    };
  }

  componentDidMount() {
    this.props.allOmniEats()
  }

  render() {
    const { center, zoom } = this.state;
    const { omniEatsRestaurants } = this.props
    return (
      <div
        style={{
          position: 'absolute',
          height: '100vh',
          width: '100%',
          marginTop: 25
        }}
      >
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.MAPKEY || 'AIzaSyA50mDPBaEgfNWestAu7oPjFK85h1rhE88'}}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {omniEatsRestaurants.map(restaurant => (
            <Marker
              restaurantId={restaurant.id}
              key={restaurant.id}
              lat={restaurant.latitude}
              lng={restaurant.longitude}
              color="blue"
              name={restaurant.name}
              googleId={restaurant.googleId}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

const stateToProps = ({ omniEatsRestaurants }) => {
  return {
    omniEatsRestaurants
  }
}

const dispatchToProps = dispatch => {
  return {
    allOmniEats: () => dispatch(getAllOmniEats())
  }
}

export default connect(stateToProps, dispatchToProps)(MapDisplay);
