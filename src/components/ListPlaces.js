import React from "react";
import axios from "axios";
import MapDisplay from "./MapDisplay";
import { MDBIcon } from "mdbreact";

class ListPlaces extends React.Component {
  constructor() {
    super();
    this.state = {
      lng: 0,
      lat: 0,
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
          longitude: pos.coords.longitude
        };
        await setLocation(location);
      });
    } else {
      console.error("Device Not Compatible Must have a GPS module");
    }
  }

  async setLocation(location) {
    this.setState({
      lat: location.latitude,
      lng: location.longitude
    });
    const response = await axios.post("/api/google", location);
    this.setState({ restaurants: response.data });
  }

  render() {
    const { restaurants } = this.state;
    const { currentLocation } = this;
    const { lng, lat } = this.state;
      return (
        <div>
          <div>
            <button onClick={() => currentLocation()} style={{marginTop: 90}}>
              Get Nearby Restaurants
            </button>
            {restaurants.length > 0 ? (
              <div>
                <ul>
                  {restaurants.map(restaurant => (
                    <li key={restaurant.id}>{restaurant.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              ""
            )}
          </div>
          <MapDisplay center={{ lat, lng }} places={restaurants} />;
        </div>
      );
    }
  }


export default ListPlaces;
