import React from 'react';
import { TextInput, View, Text } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  containerStyle: {
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1,
  },
  inputStyle: {
    color: '#000000',
    paddingRight: 5,
    paddingLeft: 5,
    fontSize: 18,
    lineHeight: 23,
    flex: 2,
  },
};

const Input = ({
  label, value, onChangeText, placeholder, secureTextEntry,
}) => (
  <View style={styles.containerStyle}>
    <Text style={styles.labelStyle}>{label}</Text>
    <TextInput
      placeholder={placeholder}
      style={styles.inputStyle}
      onChangeText={onChangeText}
      value={value}
      autoCorrect={false}
      secureTextEntry={secureTextEntry}
    />
  </View>
);

Input.defaultProps = {
  placeholder: '',
  secureTextEntry: false,
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeText: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  secureTextEntry: PropTypes.bool,
};

export { Input }; // eslint-disable-line import/prefer-default-export
