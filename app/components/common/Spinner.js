import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  spinnerStyle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const Spinner = ({ size }) => (
  <View style={styles.spinnerStyle}>
    <ActivityIndicator size={size || 'large'} />
  </View>
);

Spinner.propTypes = {
  size: PropTypes.string.isRequired,
};

export { Spinner }; // eslint-disable-line import/prefer-default-export
