import React from 'react';
import { View } from 'react-native';

const styles = {
  containerStyle: {
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
};

const Card = ({ children }) => <View style={styles.containerStyle}>{children}</View>;

export { Card };
