import React from 'react';
import GoogleMapReact from 'google-map-react';
import { connect } from 'react-redux';
import Marker from './Marker';
import { getAllOmniEats, currentLocation, getDirections } from '../store';
import UserMarker from './UserMarker';
import SliderComp from './SliderComp'

class MapDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      heatmapToggle: true,
      gDirections: {}
    };
    this.toggleHeatMap = this.toggleHeatMap.bind(this);
  }
  componentDidUpdate(prevProps) {
    const { filters, directions } = this.props;
    if (prevProps.filters.length !== filters.length) {
      this.props.allOmniEats(filters);
    }
    if (
      Object.keys(prevProps.directions).length !==
        Object.keys(directions).length ||
      prevProps.directions.origin !== directions.origin ||
      prevProps.directions.destination !== directions.destination
    ) {
      this.setState({ gDirections: directions.query });
    }
  }
  componentDidMount() {
    const { filters } = this.props;
    this.props.getUserLocation();
    this.props.allOmniEats(filters);
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
    const { toggleHeatMap } = this;
    const { omniEatsRestaurants, center, zoom, directions } = this.props;

    const data = omniEatsRestaurants.map(restaurant => ({
      lat: Number(restaurant.latitude),
      lng: Number(restaurant.longitude),
      weight: Number(restaurant.grating)
    }));
    const heatmapData = {
      positions: data,
      options: {
        radius: 80,
        opacity: 0.8
      }
    };
    const apiIsLoaded = (map, maps) => {
      const trafficLayer = new google.maps.TrafficLayer();
      trafficLayer.setMap(map);
      if (directions.query) {
        const directionService = new maps.DirectionsService();
        const directionDisplay = new maps.DirectionsRenderer();
        directionService.route(
          {
            origin: directions.query.origin,
            destination: directions.query.destination,
            travelMode: 'DRIVING'
          },
          (response, status) => {
            if (status === 'OK') {
              directionDisplay.setDirections(response);
              console.log(response);
              const routePolyline = new google.maps.Polyline({
                path: response.routes[0].overview_path
              });
              routePolyline.setMap(map);
            } else {
              window.alert('Directions request failed to ' + status);
            }
          }
        );
      }
    };
    return (
      <div
        style={{
          height: '72vh',
          minWidth: 1120,
          width: '100%',
          marginTop: 82,
          position: 'fixed'
        }}
      >
        <SliderComp />
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
                grating={restaurant.grating}
                gUserRatingsTotal={restaurant.gUserRatingsTotal}
                hours={restaurant.hours}
                imgUrl={restaurant.imgUrl}
              />
            );
          })}
        </GoogleMapReact>
        <button onClick={toggleHeatMap} style={{marginLeft: 162}}>Toggle Heatmap</button>
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
