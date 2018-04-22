import React from 'react';
import { View } from 'react-native';

const styles = {
  containerStyle: {
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
};

const CardSection = ({ children, style }) => (
  <View style={{ ...styles.containerStyle, ...style }}>{children}</View>
);

export { CardSection };
