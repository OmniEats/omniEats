import React from "react";
import axios from 'axios'

class App extends React.Component {
    constructor(){
        super()
        this.currentLocation = this.currentLocation.bind(this)
    }
    currentLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(pos){
                const location = {
                    latitude: pos.coords.latitude,
                    longitude: pos.coords.longitude
                }

            })
        } else {
            console.error('Device Not Compatible Must have a GPS module')
        }
    }
  render() {

    return (
        <div>
            <button>Get Nearby Restraunts</button>
        </div>
    )
  }
}

export default App;
