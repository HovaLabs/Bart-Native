import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';

function trainString(props) {
  const minutes = props.minutes.includes('eaving')
    ? 'Leaving'
    : `${props.minutes} minute${Number(props.minutes) === 1 ? '' : 's'}`;
  return `${props.destination}: ${minutes}`;
}

const Train = props => (
  <View style={{ flex: 1, flexDirection: 'row' }}>
    <View
      style={{
        width: 15,
        height: 15,
        backgroundColor: props.hexcolor,
        justifyContent: 'center',
      }}
    />
    <View style={{ paddingLeft: 5 }}>
      <Text>{trainString(props)}</Text>
    </View>
  </View>
);

Train.propTypes = {
  hexcolor: PropTypes.string.isRequired,
};

export default Train;
