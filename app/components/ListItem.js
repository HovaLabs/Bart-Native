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
  listStyle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '500',
    paddingTop: 10,
    paddingBottom: 10,
  },
  titleStyle: {
    paddingLeft: 15,
    fontWeight: 'bold',
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
                <Text style={{ ...styles.listStyle, ...styles.titleStyle }}>{station.name}</Text>
              </View>
              <View style={{ marginLeft: 'auto' }}>
                <Text style={styles.listStyle}>{station.distanceFromDevice || '?'} miles</Text>
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
