import React from 'react';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      longitude: 0,
      latitude: 0,
      restaurants: []
    };
    this.currentLocation = this.currentLocation.bind(this);
    this.setLocation = this.setLocation.bind(this);
  }
  currentLocation() {
    const { setLocation } = this;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async function(pos) {
        const location = {
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        };
        await setLocation(location);
      });
    } else {
      console.error('Device Not Compatible Must have a GPS module');
    }
  }

  async setLocation(location) {
    this.setState({
      latitude: location.latitude,
      longitude: location.longitude
    });
    const response = await axios.post('/api/google', location);
    this.setState({restaurants: response.data});
    console.log(response.data)
  }

  render() {
    const { restaurants } = this.state;
    const { currentLocation } = this;
    return (
      <div>
        <button onClick={() => currentLocation()}>Get Nearby Restaurants</button>
        {restaurants.length > 0 ? (
          <div>
            <ul>
              {restaurants.map(restaurant => (
                <li key={restaurant.id}>{restaurant.name}</li>
              ))}
            </ul>
          </div>
        ) : (
          ''
        )}
      </div>
    );
  }
}

export default App;
