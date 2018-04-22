import React from 'react';
import { View } from 'react-native';
import { Colors } from './Theme';

const styles = {
  containerStyle: {
    borderWidth: 0,
    borderRadius: 0,
  },
};

const Card = ({ children }) => <View style={styles.containerStyle}>{children}</View>;

export { Card };
