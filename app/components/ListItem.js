import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'react-autobind';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import distance from 'gps-distance';
import { Colors } from '../Variables';

import { selectStation } from '../actions';

import { CardSection } from './common';

const styles = {
  titleStyle: {
    color: Colors.white,
    fontSize: 18,
    paddingLeft: 15,
  },
  distanceStyle: {
    fontSize: 18,
    color: Colors.white,
  },
};

class ListItem extends Component {
  constructor(props) {
    super(props);

    autobind(this);
  }

  onRowPress() {
    this.props.selectStation(this.props.station);
    Actions.station({ title: this.props.station.name });
  }

  render() {
    const { user, station } = this.props;
    const backgroundColor = station.index % 2 === 0 ? Colors.black : Colors.gray;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <CardSection backgroundColor={backgroundColor}>
            <View style={{ flex: 1, flexDirection: 'row' }}>
              <View>
                <Text style={styles.titleStyle}>{station.name}</Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <Text style={styles.distanceStyle}>{station.distanceFromDevice || '?'} miles</Text>
              </View>
            </View>
          </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const mapStateToProps = state => ({ user: state.user });

export default connect(mapStateToProps, { selectStation })(ListItem);
