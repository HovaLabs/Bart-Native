import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { updateStationDirection, selectStation } from '../actions';

import { Card, CardSection, Button } from './common';
import Train from './Train';

function sortDestinations({ destinations = [], station }) {
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

  trainList.sort((a, b) => {
    if (Number(a.minutes) > Number(b.minutes)) {
      return 1;
    } else if (Number(a.minutes) < Number(b.minutes)) {
      return -1;
    }
    return 0;
  });

  return trainList;
}

function renderRow(train, i) {
  return <Train key={i} {...train} />;
}

class Destinations extends Component {
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

  renderButtons() {
    return (
      <Card>
        <CardSection>
          <Button
            onPress={() => {
              this.props.updateStationDirection(this.props.station.abbr, '');
            }}
            selected={this.props.station.direction === ''}
          >
            All
          </Button>
          <Button
            onPress={() => {
              this.props.updateStationDirection(this.props.station.abbr, 'north');
            }}
            selected={this.props.station.direction === 'north'}
          >
            North
          </Button>
          <Button
            onPress={() => {
              this.props.updateStationDirection(this.props.station.abbr, 'south');
            }}
            selected={this.props.station.direction === 'south'}
          >
            South
          </Button>
        </CardSection>
      </Card>
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
    return (
      <View>
        <View>{this.renderButtons()}</View>
        <View>{this.renderNextStations()}</View>
        <View>
          <ScrollView>
            {sortDestinations(this.props).map((destination, i) => renderRow(destination, i))}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
});

Destinations.propTypes = {
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
  stationList: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateStationDirection: PropTypes.func.isRequired,
  selectStation: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { updateStationDirection, selectStation })(Destinations);
