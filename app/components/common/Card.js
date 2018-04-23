import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

const styles = {
  containerStyle: {
    elevation: 1,
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
  },
};

const Card = ({ children }) => <View style={styles.containerStyle}>{children}</View>;

Card.propTypes = {
  children: PropTypes.node.isRequired,
};

export { Card }; // eslint-disable-line import/prefer-default-export
