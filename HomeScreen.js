import React from 'react';
import { Button, View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, Image } from 'react-native';
import AppNavigator from './AppNavigator';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Veganamos',

    headerStyle: {
      backgroundColor: '#f4511e',
        justifyContent: 'center'
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      justifyContent: 'center',
      fontFamily: 'Roboto'   
    },

  };

  constructor(props) {
    super(props)
  }

  renderGridItem = ( item ) => {
      return (
        <TouchableOpacity style={ styles.gridItem }>
          <View style={ styles.listItem }>
            <Image
              style={ styles.itemImg }
              source={ require('./assets/icon.png') }
            />
              <Text style={ styles.gridItemText }>{ item.name }</Text>
          </View>
      </TouchableOpacity>

      );
  }

  renderCategories = () => {
      return (
            <FlatList
              style={ styles.categoriesList }
              pagingEnabled={true}
              horizontal={true}
              data={[
                {
                  key: 1,
                  name: 'Eating out'
                },
                {
                  key: 2,
                  name: 'Grocery'
                },
                {
                  key: 3,
                  name: 'Beauty and Health'
                },
                {
                  key: 4,
                  name: 'Products'
                },

              ]}
              renderItem={({item}) => this.renderGridItem(item)}
            />
      );
  }

  renderGoToMapButton = () => {
    return (
      <TouchableOpacity 
        style={styles.gotomapContainer}
        activeOpacity={0.5}
        onPress={() =>  this.props.navigation.navigate('Map') }
        >
          <Image 
            source={require('./assets/google-maps.png')} 
            style={styles.mapImg}
            resizeMode="cover"
          />

        <View style={ styles.gotomapview } >
          <Text style={ styles.gotomaptext }>Go to Map</Text>
        </View>
      </TouchableOpacity>
    )
  }
  render() {
    return (
      <View style={ styles.container }>
        { this.renderGoToMapButton() }
        { this.renderCategories() }
      </View>


    );
  }

}

const styles = StyleSheet.create({
  gotomapview: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gotomaptext: {
    fontWeight: 'bold',
    fontSize: 32,
    color: 'blue'
  },
  gotomapContainer: {
      alignItems: 'stretch',
      flex: 1/4,
  },
  mapImg: {
    flex: 1,
  },
  gridItemText: {
    fontWeight: 'bold',
    fontFamily: 'Roboto',
    fontSize: 20,
    color: 'black',

    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  categoriesList: {
    flexGrow: 1/3,
    margin: 5,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: 'transparent',
  },
  listItem: {
      flex: 1,
      padding: 10,
      justifyContent:'center',
      alignItems: 'center',
      backgroundColor: 'transparent',
  },
  itemImg: {
    flex: 1,
    resizeMode: 'contain',
    borderRadius:100,
  },
  gridItem: {
    flex: 1,
    backgroundColor: 'transparent',
  },
});

