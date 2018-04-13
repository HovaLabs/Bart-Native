import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';

import ListItem from './ListItem';

class StationList extends Component {
  componentWillMount() {
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(this.props.stationList);
  }

  renderRow(station) {
    return <ListItem station={station} />;
  }

  render() {
    const { stationList } = this.props;

    return <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />;
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
});

export default connect(mapStateToProps)(StationList);
