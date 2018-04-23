import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';

import { pingStation, updateStationDirection, selectStation } from '../actions';

import { Card, CardSection, Button } from './common';
import Train from './Train';

function sortDestinations(destinations = [], direction) {
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

const renderRow = (train, i) => <Train key={i} {...train} />;

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

  renderButtons() {
    return (
      <Card>
        <CardSection>
          <Button
            onPress={() => {
              this.props.updateStationDirection(this.props.selectedStation.abbr, '');
            }}
            selected={this.props.selectedStation.direction === ''}
          >
            All
          </Button>
          <Button
            onPress={() => {
              this.props.updateStationDirection(this.props.selectedStation.abbr, 'north');
            }}
            selected={this.props.selectedStation.direction === 'north'}
          >
            North
          </Button>
          <Button
            onPress={() => {
              updateStationDirection(this.props.selectedStation.abbr, 'south');
            }}
            selected={this.props.selectedStation.direction === 'south'}
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
          {this.props.selectedStation.northStations.map(abbr => this.stationLink(abbr))}
          {this.props.selectedStation.southStations.map(abbr => this.stationLink(abbr))}
        </CardSection>
      </Card>
    );
  }

  render() {
    const { stationInfo, selectedStation } = this.props;
    return (
      <View>
        <View>{this.renderButtons()}</View>
        <View>{this.renderNextStations()}</View>
        {stationInfo ? (
          <View>
            <ScrollView>
              {sortDestinations(stationInfo, selectedStation.direction).map((destination, i) =>
                renderRow(destination, i))}
            </ScrollView>
          </View>
        ) : (
          <View />
        )}
      </View>
    );
  }
}

Station.defaultProps = {
  stationInfo: null,
};

Station.propTypes = {
  stationList: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    abbr: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    direction: PropTypes.string,
    visits: PropTypes.number,
    northStations: PropTypes.arrayOf(PropTypes.string),
    southStations: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
  selectedStation: PropTypes.shape({
    name: PropTypes.string,
    abbr: PropTypes.string,
    latitude: PropTypes.string,
    longitude: PropTypes.string,
    direction: PropTypes.string,
    visits: PropTypes.number,
    northStations: PropTypes.arrayOf(PropTypes.string),
    southStations: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  pingStation: PropTypes.func.isRequired,
  updateStationDirection: PropTypes.func.isRequired,
  selectStation: PropTypes.func.isRequired,
  stationInfo: PropTypes.arrayOf(PropTypes.object),
};

const findSelectedStation = (state) => {
  const { stationList, selectedStation } = state.stationInfo;
  return stationList.find(station => station.abbr === selectedStation.abbr);
};

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
  selectedStation: findSelectedStation(state),
  stationInfo: state.stationInfo.stationInfo,
});

export default connect(mapStateToProps, {
  pingStation,
  updateStationDirection,
  selectStation,
})(Station);
