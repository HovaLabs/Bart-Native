import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Colors } from './Theme';

const styles = {
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.black,
    marginLeft: 5,
    marginRight: 5,
    paddingTop: 15,
    paddingBottom: 15,
  },
  textStyle: {
    color: Colors.white,
    textAlign: 'center',
  },
};

const Button = ({
  children, onPress, selected = false, style = {},
}) => (
  <TouchableOpacity onPress={onPress} style={selected ? { ...style } : styles.buttonStyle}>
    <Text style={selected ? { ...style } : styles.textStyle}>{children}</Text>
  </TouchableOpacity>
);

export { Button };
