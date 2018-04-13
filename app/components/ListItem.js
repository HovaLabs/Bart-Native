import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'react-autobind';
import { Actions } from 'react-native-router-flux';

import { CardSection } from './common';

const styles = {
  titleStyle: {
    fontSize: 18,
    paddingLeft: 15,
  },
};

class ListItem extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  onRowPress() {
    Actions.employeeEdit({ employee: this.props.employee });
  }

  render() {
    const { name } = this.props.employee;

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <CardSection>
            <Text style={styles.titleStyle}>{name}</Text>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ListItem;
