import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../Variables';

function minutesToDeparture(props) {
  const minutes = props.minutes === 0
    ? 'Leaving'
    : `${props.minutes} minute${Number(props.minutes) === 1 ? '' : 's'}`;
  return minutes;
}
const trainStyle = {
  flex: 1,
  flexDirection: 'column',
  paddingTop: 10,
  paddingBottom: 10,
  paddingLeft: 15,
  borderBottomColor: Colors.black,
  borderBottomWidth: 1,
};

function bartColorToCustomColor(color) {
  return Colors[color.toLowerCase()];
}

const Train = props => (
  <View style={{ ...trainStyle, backgroundColor: bartColorToCustomColor(props.color) }}>
    <View style={{ flex: 1, flexDirection: 'row' }}>
      <Text style={{ fontSize: 18 }}>{props.destination}:</Text>
      <Text style={{ paddingRight: 15, fontSize: 18, marginLeft: 'auto' }}>
        {minutesToDeparture(props)}
      </Text>
    </View>
    <Text style={{ fontSize: 18, paddingTop: 5 }}>{props.length} Trains</Text>
  </View>
);

Train.propTypes = {
  hexcolor: PropTypes.string.isRequired,
};

export default Train;
