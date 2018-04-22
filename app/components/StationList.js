import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ListView } from 'react-native';
import PropTypes from 'prop-types';

import { Colors } from '../Variables';

import { updateDeviceLocation } from '../actions';

import StationsFilter from './StationsFilter';
import ListItem from './ListItem';

const renderRow = station => <ListItem station={station} />;

class StationList extends Component {
  componentWillMount() {
    const options = {
      // enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    const success = (position) => {
      this.props.updateDeviceLocation(position);
    };

    const error = (err) => {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    };

    navigator.geolocation.getCurrentPosition(success, error, options);

    const stationList = this.props.stationList.map((station, i) => ({ ...station, index: i }));
    this.createDataSource(stationList);
  }

  componentWillReceiveProps(nextProps) {
    const stationList = nextProps.stationList.map((station, i) => ({ ...station, index: i }));
    this.createDataSource(stationList);
  }

  createDataSource(stationList) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(stationList);
  }

  render() {
    return (
      <View style={{ backgroundColor: Colors.gray }}>
        <StationsFilter />
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={renderRow} />
      </View>
    );
  }
}

StationList.propTypes = {
  stationList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    abbr: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    direction: PropTypes.string,
    visits: PropTypes.number,
    northStations: PropTypes.arrayOf(PropTypes.string),
    southStations: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  updateDeviceLocation: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
});

export default connect(mapStateToProps, { updateDeviceLocation })(StationList);
