import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../Variables';

const styles = {
  textStyle: {
    alignSelf: 'center',
    color: Colors.white,
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10,
  },
  selectedTextStyle: {
    color: Colors.black,
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: Colors.black,
    borderRadius: 0,
    marginLeft: 5,
    marginRight: 5,
  },
  selectedButtonStyle: {
    backgroundColor: Colors.white,
  },
};

const Button = ({
  children, onPress, selected = false, style,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={selected ? { ...styles.buttonStyle, ...styles.selectedButtonStyle } : styles.buttonStyle}
  >
    <Text
      style={selected ? { ...styles.textStyle, ...styles.selectedTextStyle } : styles.textStyle}
    >
      {children}
    </Text>
  </TouchableOpacity>
);

export { Button };
