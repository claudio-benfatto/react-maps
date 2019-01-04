import { getDistanceSimple } from 'geolib';

const INITIAL_STATE = {
  shops: [
    {
      id: 1,
      selected: true,
      category: 'restaurant',
      name: "Com a Italia",
      position: {
        latitude: 41.413219,
        longitude: 2.1782299,
      }
    },
    {
      id: 2,
      selected: true,
      name: "Casa di Pedara",
      category: 'products',
      position: {
        latitude: 37.92645537892477,
        longitude: 14.985846597701311,
      }
    },
  ],
};

const markerReducer = (state = INITIAL_STATE, action) => {
  let updatedState = Object.assign({}, state);

  switch (action.type) {
    case 'SELECT_MARKER':
       updatedState.shops = updatedState.shops.map(item => {
        if(item.id === action.markerId){
          item.selected = true
        }
        else {
          item.selected = false
        }
        return item
      })
      return updatedState
    case 'UPDATE_USER_LOCATION':
       updatedState.shops = updatedState.shops.map(item => {
          const distance = getDistanceSimple(
                item.position,
                action.coords
            );
          item.distance = distance
          return item
      })
      return updatedState
    default:
      return state
  }
};

export default markerReducer