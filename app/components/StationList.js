import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';

import { updateStationOrder, updateDeviceLocation } from '../actions';

import { Button, Card, CardSection } from './common';
import ListItem from './ListItem';

class StationList extends Component {
  componentWillMount() {
    this.createDataSource(this.props.stationList);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.updateDeviceLocation(position);
    });
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
      <Card>
        <CardSection>
          <Button
            onPress={() => this.props.updateStationOrder('alphabetical')}
            selected={this.props.stationOrder === 'alphabetical'}
          >
            A-Z
          </Button>
          <Button
            onPress={() => this.props.updateStationOrder('distance')}
            selected={this.props.stationOrder === 'distance'}
          >
            Distance
          </Button>
          <Button
            onPress={() => this.props.updateStationOrder('favorites')}
            selected={this.props.stationOrder === 'favorites'}
          >
            Favorites
          </Button>
        </CardSection>
        <ListView
          style={{ marginBottom: 53 }}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
  stationOrder: state.stationInfo.stationOrder,
});

export default connect(mapStateToProps, { updateDeviceLocation, updateStationOrder })(StationList);
