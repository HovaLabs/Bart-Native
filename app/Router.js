import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Platform, Image, Dimensions } from 'react-native';

import Station from './components/Station';
import StationList from './components/StationList';

const { height, width } = Dimensions.get('window');

console.log('sweet dimensions', height, width);

const styles = {
  navBar: {
    marginTop: Platform.OS === 'ios' ? 0 : 24,
  },
  sceneStyle: {
    paddingTop: Platform.OS === 'ios' ? 65 : 84,
  },
  logoStyle: {
    width: 150,
    marginTop: 15,
    marginBottom: 15,
    marginLeft: 10,
  },
};

const NavBar = () => <Image style={styles.logoStyle} source={require('./logo.png')} />;

const RouterComponent = props => (
  <Router navBar={NavBar}>
    <Scene key="root" hideNavBar>
      <Scene key="main">
        <Scene key="stationList" component={StationList} title="Station List" initial />
        <Scene key="station" component={Station} />
      </Scene>
    </Scene>
  </Router>
);

mapStateToProps = state => ({
  selectedStation: state.selectedStation,
});

export default connect(mapStateToProps)(RouterComponent);
