import React from 'react';
import { Text, View, ScrollView, StyleSheet } from 'react-native';
import {Constants, MapView, Location, Permissions, Marker, LatLng } from 'expo';
import AppNavigator from './AppNavigator';
import { connect } from 'react-redux';
import { updateMapRegion, updateUserLocation, selectMarker } from './actions';
import { bindActionCreators } from 'redux';
import { getDistanceSimple } from 'geolib';

import Place from './components/Place'

class Map extends React.Component {

  navigateToDescription = () => {
    this.props.navigation.navigate('Description')
  }

  async componentDidMount() {
    let region = await this._getLocationAsync();
    this.props.updateMapRegion(region)
    const { latitude, longitude } = region
    this.props.updateUserLocation({latitude, longitude})
  }

  onRegionChange = region => {
    this.props.updateMapRegion( region );
  }

  onSelectMarker = markerId => {
    this.props.selectMarker( markerId );
  }

  onUpdateUserLocation = coords => {
    const { latitude, longitude } = coords.coordinate
    this.props.updateUserLocation({latitude, longitude})
  }

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   let region = undefined
  if (status == 'granted') {

  let location = await Location.getCurrentPositionAsync({});
  region = {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }
  }
  return region
 };

  render() {

      const selectedMarkers = this.props.markers.shops.filter(marker => {
        return marker.selected
      });

    return (
      <View
        style={ {flex: 1} }
      >
        <MapView
          showsUserLocation={ true }
          showsMyLocationButton={ true }
          loadingEnabled={ true }
          style={ styles.map }
          region={ this.props.location.mapRegion }
          onRegionChange={e => this.onRegionChange()}
          onUserLocationChange={ e => this.onUpdateUserLocation(e.nativeEvent) }
        >

      {this.props.markers.shops.map(marker => (
            <MapView.Marker
            coordinate={ marker.position }
            title={ marker.name }
            description={ marker.name }
            onCalloutPress={ () => this.onSelectMarker(marker.id) }
          />
      ))}
        </MapView>
          <ScrollView style={styles.desc}>
            {
              selectedMarkers.map(marker => {

              return (
                      <View>
                      <Text style={{color: 'red', fontWeight: '500'}}>Name:</Text><Text>{marker.name}</Text>
                      <Text style={{color: 'red', fontWeight: '500'}}>Description:</Text><Text>{marker.name}</Text>
                      <Text style={{color: 'red', fontWeight: '500'}}>Description:</Text><Text>{marker.distance/1000} Km</Text>
                    </View>
              );
            })
            }
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 3/4
  },
  desc: {
    flex: 1/4
  },
});

const mapDispatchToProps = (dispatch) => (
  {
    updateMapRegion: region => dispatch(updateMapRegion(region)),
    updateUserLocation: coords => dispatch(updateUserLocation(coords)),
    selectMarker: marker => dispatch(selectMarker(marker))
});

const mapStateToProps = (state) => {
  const  { markers, location }  = state
  return { markers, location }
};

export default connect(mapStateToProps, mapDispatchToProps)(Map)