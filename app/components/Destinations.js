import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { updateStationDirection, selectStation } from '../actions';

import { Card, CardSection, Button } from './common';
import Train from './Train';

class Destinations extends Component {
  constructor(props) {
    super(props);
  }

  sortDestinations({ destinations = [], station }) {
    const trainList = [];
    destinations.forEach((destination) => {
      destination.estimate.forEach((train) => {
        // Sorting hack. look for empty string to select all, or north / south
        if (train.direction.toLowerCase().includes(station.direction)) {
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
    const { station, updateStationDirection } = this.props;

    return (
      <Card>
        <CardSection>
          <Button
            onPress={() => {
              updateStationDirection(station.abbr, '');
            }}
            selected={station.direction === ''}
          >
            All
          </Button>
          <Button
            onPress={() => {
              updateStationDirection(station.abbr, 'north');
            }}
            selected={station.direction === 'north'}
          >
            North
          </Button>
          <Button
            onPress={() => {
              updateStationDirection(station.abbr, 'south');
            }}
            selected={station.direction === 'south'}
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
          {this.props.station.northStations.map(abbr => this.stationLink(abbr))}
          {this.props.station.southStations.map(abbr => this.stationLink(abbr))}
        </CardSection>
      </Card>
    );
  }

  render() {
    const { station, updateStationDirection } = this.props;

    return (
      <View>
        <View>{this.renderButtons()}</View>
        <View>{this.renderNextStations()}</View>
        <View>
          <ScrollView>
            {this.sortDestinations(this.props).map((destination, i) =>
              this.renderRow(destination, i))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
});

export default connect(mapStateToProps, { updateStationDirection, selectStation })(Destinations);
