import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import { pingStation, updateStationDirection, selectStation } from '../actions';

import { Card, CardSection, Button } from './common';
import Train from './Train';

class Station extends Component {
  componentDidMount() {
    this.setPingInterval();
  }

  componentWillUnmount() {
    this.clearPingInterval();
  }

  setPingInterval() {
    this.updater = setInterval(() => {
      this.props.pingStation(this.props.selectedStation.abbr);
    }, 10000);
    this.props.pingStation(this.props.selectedStation.abbr);
  }

  clearPingInterval() {
    clearInterval(this.updater);
  }

  sortDestinations(destinations = [], direction) {
    const trainList = [];
    destinations.forEach((destination) => {
      destination.estimate.forEach((train) => {
        // Sorting hack. look for empty string to select all, or north / south
        if (train.direction.toLowerCase().includes(direction)) {
          trainList.push({
            ...train,
            destination: destination.destination,
            abbreviation: destination.abbreviation,
            limited: destination.limited,
          });
        }
      });
    });

    trainList.sort((a, b) =>
      (Number(a.minutes) > Number(b.minutes) ? 1 : Number(a.minutes) < Number(b.minutes) ? -1 : 0));

    return trainList;
  }

  renderRow(train, i) {
    return (
      <CardSection key={i}>
        <Train {...train} />
      </CardSection>
    );
  }

  renderButtons() {
    const { selectedStation, updateStationDirection } = this.props;

    return (
      <Card>
        <CardSection>
          <Button
            onPress={() => {
              updateStationDirection(selectedStation.abbr, '');
            }}
            selected={selectedStation.direction === ''}
          >
            All
          </Button>
          <Button
            onPress={() => {
              updateStationDirection(selectedStation.abbr, 'north');
            }}
            selected={selectedStation.direction === 'north'}
          >
            North
          </Button>
          <Button
            onPress={() => {
              updateStationDirection(selectedStation.abbr, 'south');
            }}
            selected={selectedStation.direction === 'south'}
          >
            South
          </Button>
        </CardSection>
      </Card>
    );
  }

  stationLink(abbr) {
    return (
      <Button
        key={abbr}
        onPress={() => {
          const selectedStation = this.props.stationList.find(station => station.abbr === abbr);
          this.props.selectStation(selectedStation);
          Actions.refresh({ title: selectedStation.name });
          this.clearPingInterval();
          this.setPingInterval();
        }}
      >
        {abbr}
      </Button>
    );
  }
  renderNextStations() {
    return (
      <Card>
        <CardSection>
          {this.props.selectedStation.northStations.map(abbr => this.stationLink(abbr))}
          {this.props.selectedStation.southStations.map(abbr => this.stationLink(abbr))}
        </CardSection>
      </Card>
    );
  }

  render() {
    const { selectedStation, updateStationDirection, stationInfo } = this.props;

    let destinations;
    try {
      destinations = this.props.stationInfo.root.station[0].etd;
    } catch (ex) {}

    return (
      <View>
        <View>{this.renderButtons()}</View>
        <View>{this.renderNextStations()}</View>
        {destinations ? (
          <View>
            <ScrollView>
              {this.sortDestinations(destinations, selectedStation.direction).map((destination, i) => this.renderRow(destination, i))}
            </ScrollView>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
  selectedStation: state.stationInfo.stationList.find(station => station.abbr === state.stationInfo.selectedStation.abbr),
  stationInfo: state.stationInfo.stationInfo,
});
export default connect(mapStateToProps, { pingStation, updateStationDirection, selectStation })(Station);
