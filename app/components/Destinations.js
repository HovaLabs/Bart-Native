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
    const destinations = this.props.destinations.filter(destination =>
      destination.estimate[0].direction.toLowerCase().includes(this.state.directionFilter));

    console.log(destinations);
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
        {destinations.map((destination, i) => (
          <CardSection key={i}>
            <Train {...destination} />
          </CardSection>
        ))}
      </Card>
    );
  }
}
export default Destinations;
