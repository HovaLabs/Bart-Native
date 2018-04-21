import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router, Actions } from 'react-native-router-flux';
import { Platform, AsyncStorage } from 'react-native';

import { loadSavedState } from './actions';
import * as defaultData from './defaultData';

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

class RouterComponent extends Component {
  async componentDidMount() {
    // await AsyncStorage.clear();
    try {
      const savedState = await AsyncStorage.getItem('appData');
      if (savedState) {
        this.props.loadSavedState({ ...defaultData, ...JSON.parse(savedState) });
      } else {
        await AsyncStorage.setItem('appData', JSON.stringify(defaultData));
        this.props.loadSavedState(defaultData);
      }
    } catch (ex) {
      console.error(ex);
    }
  }

  render() {
    return (
      <Router navigationBarStyle={styles.navBar} sceneStyle={styles.sceneStyle}>
        <Scene key="root" hideNavBar>
          <Scene key="main">
            <Scene key="stationList" component={StationList} title="Station List" initial />
            <Scene key="station" component={Station} />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

mapStateToProps = state => ({
  selectedStation: state.selectedStation,
});

export default connect(mapStateToProps, { loadSavedState })(RouterComponent);
