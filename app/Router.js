import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { Platform, AsyncStorage, StatusBar } from 'react-native';
import PropTypes from 'prop-types';

import { loadSavedState } from './actions';
import * as defaultData from './defaultData';
import { Colors } from './Variables';
import Station from './components/Station';
import StationList from './components/StationList';

const styles = {
  navBar: {
    marginTop: Platform.OS === 'ios' ? 0 : 24,
    backgroundColor: Colors.gray,
    borderBottomWidth: 0,
  },
  sceneStyle: {
    paddingTop: Platform.OS === 'ios' ? 65 : 84,
    backgroundColor: Colors.gray,
  },
  navigationBarTitleImageStyle: {
    height: 40,
    alignSelf: 'flex-start',
    marginLeft: 20,
    paddingTop: 30,
  },
  leftButtonStyle: {
    fill: Colors.white,
  },
};

class RouterComponent extends Component {
  async componentDidMount() {
    StatusBar.setBarStyle('light-content', true);
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
      <Router
        navigationBarStyle={styles.navBar}
        style={{ backgroundColor: Colors.gray }}
        sceneStyle={styles.sceneStyle}
      >
        <Scene key="root" hideNavBar>
          <Scene key="main">
            <Scene
              navigationBarTitleImage={require('./img/logo.png')} // eslint-disable-line global-require
              navigationBarTitleImageStyle={styles.navigationBarTitleImageStyle}
              key="stationList"
              component={StationList}
              title="Station List"
              initial
            />
            <Scene
              leftButtonIconStyle={{ tintColor: Colors.white }}
              titleStyle={{ color: Colors.white, fontWeight: '700' }}
              key="station"
              component={Station}
            />
          </Scene>
        </Scene>
      </Router>
    );
  }
}

RouterComponent.propTypes = {
  loadSavedState: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  selectedStation: state.selectedStation,
});

export default connect(mapStateToProps, { loadSavedState })(RouterComponent);
