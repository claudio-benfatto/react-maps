const INITIAL_STATE = {
    mapRegion: { latitude: 37.78825, longitude: -13.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
    currentLocation: { latitude: 37.78825, longitude: -13.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
};

const mapReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UPDATE_MAP_REGION':
    return Object.assign({}, state, {
          mapRegion: { ...action.region }
      });
    case 'UPDATE_USER_LOCATION':
    return Object.assign({}, state, {
          currentLocation: { ...action.coords }
      });
    default:
      return state
  }
};

export default mapReducer