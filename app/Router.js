import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Platform } from 'react-native';

import Station from './components/Station';
import StationList from './components/StationList';

const styles = {
  navBar: {
    marginTop: Platform.OS === 'ios' ? 0 : 24,
  },
  sceneStyle: {
    paddingTop: Platform.OS === 'ios' ? 65 : 84,
  },
};

const RouterComponent = props => (
  <Router navigationBarStyle={styles.navBar} sceneStyle={styles.sceneStyle}>
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
