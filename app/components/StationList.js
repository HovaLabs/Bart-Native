import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';

import { updateStationListFilter, updateDeviceLocation } from '../actions';

import { Button, CardSection } from './common';
import ListItem from './ListItem';

class StationList extends Component {
  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.updateDeviceLocation(position);
    });

    this.createDataSource(this.props.stationList);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.stationList);
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
      <View style={{ marginBottom: 53 }}>
        <CardSection>
          <Button
            onPress={() => this.props.updateStationListFilter('alphabetical')}
            selected={this.props.stationOrder === 'alphabetical'}
          >
            A-Z
          </Button>
          <Button
            onPress={() => this.props.updateStationListFilter('distance')}
            selected={this.props.stationOrder === 'distance'}
          >
            Distance
          </Button>
          <Button
            onPress={() => this.props.updateStationListFilter('favorites')}
            selected={this.props.stationOrder === 'favorites'}
          >
            Favorites
          </Button>
        </CardSection>
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
