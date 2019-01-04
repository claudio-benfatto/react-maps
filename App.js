import React from 'react';
import {Constants } from 'expo';
import AppNavigator from './AppNavigator';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import markerReducer from './MarkerReducer';
import mapReducer from './MapReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({markers: markerReducer, location: mapReducer })
const store = createStore(rootReducer);

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Provider store={ store }>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App