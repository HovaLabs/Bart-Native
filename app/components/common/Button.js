import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import stylePropType from 'react-style-proptype';

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
    marginLeft: 5,
    marginRight: 5,
  },
  selectedButtonStyle: {
    backgroundColor: Colors.white,
  },
};

const Button = ({
  children, onPress, selected = false, buttonStyle, textStyle,
}) => (
  <TouchableOpacity
    onPress={onPress}
    style={
      selected
        ? { ...styles.buttonStyle, ...styles.selectedButtonStyle, ...buttonStyle }
        : { ...styles.buttonStyle, ...buttonStyle }
    }
  >
    <Text
      style={
        selected
          ? { ...styles.textStyle, ...styles.selectedTextStyle, ...textStyle }
          : { ...styles.textStyle, ...textStyle }
      }
    >
      {children}
    </Text>
  </TouchableOpacity>
);

Button.defaultProps = {
  onPress: null,
  selected: false,
  buttonStyle: {},
  textStyle: {},
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onPress: PropTypes.func,
  selected: PropTypes.bool,
  buttonStyle: stylePropType,
  textStyle: stylePropType,
};

export { Button }; // eslint-disable-line import/prefer-default-export
