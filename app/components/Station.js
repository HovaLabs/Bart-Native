import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

import { stationInfoUpdated } from '../actions';

import Destinations from './Destinations';

class Station extends Component {
  componentDidMount() {
    // ping for train info
    this.updater = setInterval(() => {
      this.pingStation();
    }, 10000);
    this.pingStation();
  }

  componentWillUnmount() {
    clearInterval(this.updater);
  }

  async pingStation() {
    const stationUrl = `https://api.bart.gov/api/etd.aspx?cmd=etd&orig=${
      this.props.selectedStation.abbr
    }&key=MW9S-E7SL-26DU-VV8V&json=y`;

    try {
      const reply = await fetch(stationUrl);
      const json = await reply.json();
      this.props.stationInfoUpdated(json);
    } catch (ex) {
      console.error(ex);
    }
  }

  renderTrains() {
    if (!this.props.stationInfo) {
      return null;
    }

    return <Destinations destinations={this.props.stationInfo.root.station[0].etd} />;
  }

  render() {
    return (
      <View>
        <Text>{this.props.selectedStation.name}</Text>
        {this.renderTrains()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  selectedStation: state.stationInfo.selectedStation,
  stationInfo: state.stationInfo.stationInfo,
});

export default connect(mapStateToProps, { stationInfoUpdated })(Station);
