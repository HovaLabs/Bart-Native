import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';

import { updateLocation } from '../actions';

import { Button, CardSection } from './common';
import ListItem from './ListItem';

class StationList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listView: 'alphabetical',
    };
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.updateLocation(position);
    });

    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(this.props.stationList);
  }

  renderRow(station) {
    return <ListItem station={station} />;
  }

  render() {
    const { stationList } = this.props;

    return (
      <View>
        <CardSection>
          <Button
            onPress={() => this.setState({ listView: 'alphabetical' })}
            selected={this.state.listView === 'alphabetical'}
          >
            A-Z
          </Button>
          <Button
            onPress={() => this.setState({ listView: 'north' })}
            selected={this.state.listView === 'north'}
          >
            Distance
          </Button>
          <Button
            onPress={() => this.setState({ listView: 'south' })}
            selected={this.state.listView === 'south'}
          >
            Favorites
          </Button>
        </CardSection>
        <ListView enableEmptySections dataSource={this.dataSource} renderRow={this.renderRow} />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
  user: state.user,
});

export default connect(mapStateToProps, { updateLocation })(StationList);
