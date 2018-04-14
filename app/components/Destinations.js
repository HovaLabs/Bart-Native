import React, { Component } from 'react';
import { View, Text, TouchableWithoutFeedback } from 'react-native';

import { Card, CardSection, Button } from './common';
import Train from './Train';

class Destinations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      directionFilter: '',
    };
  }

  render() {
    const trainList = [];
    this.props.destinations.forEach((destination) => {
      destination.estimate.forEach((train) => {
        if (train.direction.toLowerCase().includes(this.state.directionFilter)) {
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

    return (
      <Card>
        <CardSection>
          <Button
            onPress={() => this.setState({ directionFilter: '' })}
            selected={this.state.directionFilter === ''}
          >
            All
          </Button>
          <Button
            onPress={() => this.setState({ directionFilter: 'north' })}
            selected={this.state.directionFilter === 'north'}
          >
            North
          </Button>
          <Button
            onPress={() => this.setState({ directionFilter: 'south' })}
            selected={this.state.directionFilter === 'south'}
          >
            South
          </Button>
        </CardSection>
        {trainList.map((train, i) => (
          <CardSection key={i}>
            <Train {...train} />
          </CardSection>
        ))}
      </Card>
    );
  }
}
export default Destinations;
