import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './Marker';
import { getAllOmniEats, currentLocation, getDirections } from '../store';
import UserMarker from './UserMarker';


class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heatmapToggle: true,
      heatmapCoords: [{ lat: 0, lng: 0 }, { lat: 0, lng: 0 }],
      gDirections: {}
    };
    this.toggleHeatMap = this.toggleHeatMap.bind(this);
    this.onMapClick = this.onMapClick.bind(this);
  }
  componentDidUpdate(prevProps) {
    const { filters, directions } = this.props;
    const { gDirections } = this.state
    if (prevProps.filters.length !== filters.length) {
      this.props.allOmniEats(filters);
    }
    if (Object.keys(prevProps.directions).length !== Object.keys(directions).length || prevProps.directions.origin !== directions.origin) {
      this.setState({gDirections: directions.query})
    }
  }
  componentDidMount() {
    const { filters } = this.props;
    this.props.getUserLocation();
    this.props.allOmniEats(filters);

  }

  onMapClick({ x, y, lat, lng, event }) {
    if (!this.state.heatmapToggle) {
      return;
    }
    this.setState({
      heatmapCoords: [...this.state.heatmapCoords, { lat, lng }]
    });
    if (this._googleMap !== undefined) {
      const point = new google.maps.LatLng(lat, lng);
      this._googleMap.heatmap.data.push(point);
    }
  }
  toggleHeatMap() {
    this.setState(
      {
        heatmapToggle: !this.state.heatmapToggle
      },
      () => {
        if (this._googleMap !== undefined) {
          this._googleMap.heatmap.setMap(
            this.state.heatmapToggle ? this._googleMap.map_ : null
          );
        }
      }
    );
  }


  render() {
    const { toggleHeatMap, onMapClick } = this;
    const { omniEatsRestaurants, center, zoom, directions } = this.props;
    const { gDirections } = this.state
    console.log(gDirections)
    const data = omniEatsRestaurants.map(restaurant => ({
      lat: restaurant.latitude,
      lng: restaurant.longitude,
      weight: restaurant.grating
    }));
    const heatmapData = {
      positions: data,
      options: {
        radius: 80,
        opacity: 0.8
      }
    };
    const apiIsLoaded = (map, maps) => {
      if (directions.query) {
        const directionService = new maps.DirectionsService();
        const directionDisplay = new maps.DirectionsRenderer();
        directionService.route({origin: directions.query.origin, destination: directions.query.destination, travelMode: "DRIVING"}, (response, status) => {
          if (status === 'OK') {
            directionDisplay.setDirections(response);
            console.log(response)
            const routePolyline = new google.maps.Polyline({
              path: response.routes[0].overview_path
            })
            routePolyline.setMap(map)
          } else {
            window.alert('Directions request failed to ' + status)
          }
        });
      }
    }
    return (
      <div
        style={{
          height: '85vh',
          minWidth: 1198,
          width: '100%',
          marginTop: 85,
          marginLeft: 162
        }}
      >
        <GoogleMapReact
          ref={el => (this._googleMap = el)}
          bootstrapURLKeys={{
            key:
              process.env.MAPKEY || 'AIzaSyBP8sgCR137j4KQuKiBB-3e8qKmkky3JMk',
            libraries: ['visualization']
          }}
          defaultCenter={center}
          defaultZoom={zoom}
          yesIWantToUseGoogleMapApiInternals={true}
          onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
          heatmapLibrary={true}
          heatmap={heatmapData}
          onClick={onMapClick}
        >
          <UserMarker lat={center.lat} lng={center.lng} />
          {omniEatsRestaurants.map(restaurant => {
            return (
              <Marker
                restaurantId={restaurant.id}
                key={restaurant.id}
                lat={restaurant.latitude}
                lng={restaurant.longitude}
                color={
                  !restaurant.omniRating
                    ? 'blue'
                    : restaurant.omniRating.rating === 'Meat Lovers'
                    ? 'red'
                    : restaurant.omniRating.rating === 'Half-Half'
                    ? 'yellow'
                    : restaurant.omniRating.rating === 'Vegetarian'
                    ? 'green'
                    : 'blue'
                }
                name={restaurant.name}
                googleId={restaurant.googleId}
                omniRating={
                  restaurant.omniRating
                    ? restaurant.omniRating.rating
                    : 'No Votes Yet'
                }
                imgRef={restaurant.imgRef}
                grating={restaurant.grating}
                gUserRatingsTotal={restaurant.gUserRatingsTotal}
                hours={restaurant.hours}
                apiIsLoaded={apiIsLoaded}
              />
            );
          })}
        </GoogleMapReact>
        <button onClick={toggleHeatMap}>Toggle Heatmap</button>
      </div>
    );
  }
}

const stateToProps = ({
  omniEatsRestaurants,
  userLocation,
  filters,
  directions
}) => {
  return {
    omniEatsRestaurants,
    center: userLocation,
    zoom: 15,
    filters,
    directions
  };
};

const dispatchToProps = dispatch => {
  return {
    allOmniEats: filter => dispatch(getAllOmniEats(filter)),
    getUserLocation: () => dispatch(currentLocation()),
    loadDirections: (origin, destination) =>
      dispatch(getDirections(origin, destination))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(MapDisplay);
