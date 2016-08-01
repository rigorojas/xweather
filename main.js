import React, { Component } from 'react';
import { AppRegistry, Image,MapView, Platform, StyleSheet, Text, View } from 'react-native';
// import { NavigationProvider, StackNavigation } from '@exponent/ex-navigation';
import Router from 'Router';
import registerForPushNotificationsAsync from 'registerForPushNotificationsAsync';
import { Api } from "./src/api";

class AppContainer extends Component {

  state = {
    pin: {
      latitude: 0,
      longitude: 0
    },
    city: '',
    temperature: '',
    description: ''
  };

  componentWillMount() {
    // registerForPushNotificationsAsync();
  }

  render() {
    console.log("This is the render function.");
    let { exp: { manifest } } = this.props;
    return (
      <View style={styles.container}>
        <MapView
          annotations={[this.state.pin]}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
        >
        </MapView>
        <View style={styles.textWrapper}>
          <Image
            source={{uri:'http://www.techno4.us/mem_imgs/60_1443662274.jpg'}}
            style= {styles.backgroundImage}
            resizeMode={Image.resizeMode.sretch}
          />
          <Text style={styles.text}>City: {this.state.city}</Text>
          <Text style={styles.text}>Temp: {this.state.temperature}</Text>
          <Text style={styles.text}>Desc: {this.state.description}</Text>
        </View>
      </View>
    );
  }

  onRegionChangeComplete = (region) => {
    this.setState({
      pin: {
        latitude: region.latitude,
        longitude: region.longitude
      }
    });
    Api(region.latitude, region.longitude)
    .then((data) => {
      this.setState(data);
    });
  };
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 4,
    marginTop: 30
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    flex: 1,
    fontSize: 20
  },
  backgroundImage: {
    flex: 1,
    width: 100,
    height: 100
  }
});

AppRegistry.registerComponent('main', () => AppContainer);
