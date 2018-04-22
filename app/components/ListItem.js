import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import autobind from 'react-autobind';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import distance from 'gps-distance';
import { Colors } from './common/Theme';

import { selectStation } from '../actions';

import { CardSection } from './common';

const styles = {
  titleStyle: {
    color: Colors.white,
    fontSize: 18,
    paddingLeft: 10,
  },
  distanceStyle: {
    fontSize: 16,
    color: Colors.white,
  },
  cardStyle: {
    backgroundColor: Colors.grayBg,
    borderWidth: 0,
    paddingTop: 15,
    paddingBottom: 15,
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

    return (
      <TouchableWithoutFeedback onPress={this.onRowPress}>
        <View>
          <CardSection style={styles.cardStyle}>
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
