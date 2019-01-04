export const updateMapRegion = region => {
  return {
  type: 'UPDATE_MAP_REGION',
  region: region
  }
}

export const updateUserLocation = coords => {
  return {
    type: 'UPDATE_USER_LOCATION',
    coords: coords
  }
}

export const selectMarker = markerId => {
  return {
    type: 'SELECT_MARKER',
    markerId: markerId,
  }
}
