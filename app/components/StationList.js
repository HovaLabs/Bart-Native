import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { Colors } from '../Variables';

import { updateStationListFilter, updateDeviceLocation } from '../actions';

import { Button, CardSection } from './common';
import ListItem from './ListItem';

const StationsFilter = props => (
  <CardSection>
    <Button
      onPress={() => props.updateStationListFilter('alphabetical')}
      selected={props.stationOrder === 'alphabetical'}
    >
      A-Z
    </Button>
    <Button
      onPress={() => props.updateStationListFilter('distance')}
      selected={props.stationOrder === 'distance'}
    >
      Distance
    </Button>
    <Button
      onPress={() => props.updateStationListFilter('favorites')}
      selected={props.stationOrder === 'favorites'}
    >
      Favorites
    </Button>
  </CardSection>
);

class StationList extends Component {
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.updateDeviceLocation(position);
    });

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

  renderRow(station) {
    return <ListItem station={station} />;
  }

  render() {
    const { stationList, stationOrder } = this.props;

    return (
      <View style={{ backgroundColor: Colors.gray }}>
        <StationsFilter {...this.props} />
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
  stationOrder: state.stationInfo.stationOrder,
});

export default connect(mapStateToProps, { updateDeviceLocation, updateStationListFilter })(StationList);
