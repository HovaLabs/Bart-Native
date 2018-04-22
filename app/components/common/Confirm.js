import React from 'react';
import { Text, View, Modal } from 'react-native';
import PropTypes from 'prop-types';

import { CardSection } from './CardSection';
import { Button } from './Button';
import { Colors } from '../../Variables';

const styles = {
  cardSectionStyle: {
    justifyContent: 'center',
  },
  textStyle: {
    flex: 1,
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 40,
  },
  containerStyle: {
    backgroundColor: Colors.gray,
    position: 'relative',
    flex: 1,
    justifyContent: 'center',
  },
};

const Confirm = ({
  children, visible, onAccept, onDecline,
}) => (
  <Modal visible={visible} transparent animationType="slide" onRequestClose={() => {}}>
    <View style={styles.containerStyle}>
      <CardSection style={styles.cardSectionStyle}>
        <Text style={styles.textStyle}>{children}</Text>
      </CardSection>

      <CardSection>
        <Button onPress={onAccept}>Yes</Button>
        <Button onPress={onDecline}>No</Button>
      </CardSection>
    </View>
  </Modal>
);

Confirm.defaultProps = {
  visible: false,
};

Confirm.propTypes = {
  children: PropTypes.node.isRequired,
  visible: PropTypes.bool,
  onAccept: PropTypes.func.isRequired,
  onDecline: PropTypes.func.isRequired,
};

export { Confirm }; // eslint-disable-line import/prefer-default-export
