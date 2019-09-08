import React from "react";
import axios from 'axios'

class App extends React.Component {
    constructor(){
        super()
        this.state = {
            longitude: 0,
            latitude: 0
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
        this.setState({latitude: location.latitude, longitude: location.longitude})
        const response = await axios.post('/api/google', location)
        console.log(response.data)
    }

  render() {
      const { currentLocation } = this
    return (
        <div>
            <button onClick={() => currentLocation() }>Get Nearby Restraunts</button>
        </div>
    )
  }
}

export default App;
