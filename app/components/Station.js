import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { pingStation } from '../actions';

import Destinations from './Destinations';

class Station extends Component {
  componentDidMount() {
    // ping for train info
    this.updater = setInterval(() => {
      this.props.pingStation(this.props.selectedStation.abbr);
    }, 10000);
    this.props.pingStation(this.props.selectedStation.abbr);
  }

  componentWillUnmount() {
    clearInterval(this.updater);
  }

  renderTrains() {
    if (!this.props.stationInfo) {
      return null;
    }

    return (
      <Destinations
        destinations={this.props.stationInfo.root.station[0].etd}
        station={this.props.selectedStation}
      />
    );
  }

  render() {
    return <View>{this.renderTrains()}</View>;
  }
}

const mapStateToProps = state => ({
  selectedStation: state.stationInfo.selectedStation,
  stationInfo: state.stationInfo.stationInfo,
});

export default connect(mapStateToProps, { pingStation })(Station);
