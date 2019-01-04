import { createStackNavigator } from 'react-navigation';
import Map from './Map';
import Description from './components/Description';
import HomeScreen from './HomeScreen';
import {DrawerNavigator} from 'react-navigation';


const AppNavigator = createStackNavigator({
  Home: { screen: HomeScreen },
  Map: { screen: Map},
  Description: { screen: Description },
});

export default AppNavigator
