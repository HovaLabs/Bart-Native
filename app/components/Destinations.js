import React from 'react';
import { View, Text } from 'react-native';

const Destinations = props => (
  <View>
    <Text>{JSON.stringify(props.destinations)}</Text>
  </View>
);

export default Destinations;
