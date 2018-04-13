import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

const StationList = props => (
  <View>
    {props.stationList.map(station => <Text key={station.abbr}>{JSON.stringify(station)}</Text>)}
  </View>
);

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
});

export default connect(mapStateToProps)(StationList);
