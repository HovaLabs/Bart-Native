import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import { Colors } from '../Variables';

function minutesToDeparture(props) {
  const minutes = props.minutes.includes('eaving')
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

const Train = props => (
  <View style={{ ...trainStyle, backgroundColor: props.hexcolor }}>
    <Text style={{ fontSize: 18 }}>{trainString(props)}</Text>
    <Text style={{ fontSize: 18, paddingTop: 5 }}>5 Trains</Text>
  </View>
);

Train.propTypes = {
  hexcolor: PropTypes.string.isRequired,
};

export default Train;
