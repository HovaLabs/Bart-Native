import React, { Component } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import PropTypes from 'prop-types';
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
    paddingTop: 5,
    paddingBottom: 5,
  },
  titleStyle: {
    paddingLeft: 15,
    fontWeight: 'bold',
  },
};

class ListItem extends Component {
  onRowPress() {
    this.props.selectStation(this.props.station);
    Actions.station({ title: this.props.station.name });
  }

  render() {
    const { station } = this.props;
    const backgroundColor = station.index % 2 === 0 ? Colors.black : Colors.gray;
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
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

ListItem.propTypes = {
  selectStation: PropTypes.func.isRequired,
  station: PropTypes.shape({
    name: PropTypes.string,
    abbr: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    direction: PropTypes.string,
    visits: PropTypes.number,
    northStations: PropTypes.arrayOf(PropTypes.string),
    southStations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
};

export default connect(null, { selectStation })(ListItem);
