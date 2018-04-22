import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../Variables';

const styles = {
  containerStyle: {
    padding: 10,
    paddingTop: 10,
    backgroundColor: Colors.gray,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    position: 'relative',
  },
};

const CardSection = (props) => {
  const { backgroundColor, children } = props;

  return <View style={{ ...styles.containerStyle, backgroundColor }}>{children}</View>;
};

export { CardSection };
