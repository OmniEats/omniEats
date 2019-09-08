import React from "react";
import axios from 'axios'
import MapDisplay from './MapDisplay'
import {MDBIcon} from 'mdbreact'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            lng: 0,
            lat: 0
        }
        this.currentLocation = this.currentLocation.bind(this)
        this.setLocation = this.setLocation.bind(this)

    }
     currentLocation() {
         const {setLocation} = this
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(async function(pos){
                const location = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
                }
              await  setLocation(location)
            })
        } else {
            console.error('Device Not Compatible Must have a GPS module')
        }
    }

    async setLocation(location) {
        this.setState({lat: location.latitude, lng: location.longitude})
        const response = await axios.post('/api/google', location)
        console.log(response.data)
    }

  render() {
      const { currentLocation } = this;
      const {lng, lat} = this.state;

    if(lng === 0){

        return (
            <div>
                <button onClick={() => currentLocation() }>Get Nearby Restraunts</button>
            </div>
        )
    }
    else{
        return (
            <MapDisplay center={{lat, lng}}/>
        )
    }
  }
}

export default App;
