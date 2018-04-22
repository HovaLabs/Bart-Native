import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../Variables';

const styles = {
  containerStyle: {
    padding: 5,
    backgroundColor: Colors.gray,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
};

const CardSection = ({ children, style }) => (
  <View style={{ ...styles.containerStyle, ...style }}>{children}</View>
);

export { CardSection };
