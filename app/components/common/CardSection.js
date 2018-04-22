import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';

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

CardSection.defaultProps = {
  backgroundColor: styles.containerStyle.backgroundColor,
};

CardSection.propTypes = {
  backgroundColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export { CardSection }; // eslint-disable-line import/prefer-default-export
