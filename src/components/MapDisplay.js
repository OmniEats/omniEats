import React from 'react';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import Marker from './Marker';

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      center: this.props.center,
      zoom: 11,
      restaurants: []
    };
  }

  async componentDidMount() {
    const response = await axios.get('/api/omniEats');
    this.setState({ restaurants: response.data });
  }

  render() {
    const { center, zoom, restaurants } = this.state;
    console.log(restaurants);
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
          bootstrapURLKeys={{ key: process.env.MAPKEY }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          {restaurants.map(restaurant => (
            <Marker
              key={restaurant.id}
              lat={restaurant.latitude}
              lng={restaurant.longitude}
              color="blue"
              name={restaurant.name}
            />
          ))}
        </GoogleMapReact>
      </div>
    );
  }
}

export default MapDisplay;
