import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ListView } from 'react-native';
import { Colors } from './common/Theme';

import { updateStationOrder, updateDeviceLocation } from '../actions';

import { Button, Card, CardSection } from './common';
import ListItem from './ListItem';

class StationList extends Component {
  componentWillMount() {
    this.createDataSource(this.props.stationList);
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition((position) => {
      this.props.updateDeviceLocation(position);
    });
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps.stationList);
  }

  createDataSource(stationList) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
    });

    this.dataSource = ds.cloneWithRows(stationList);
  }

  renderRow(station) {
    return <ListItem station={station} />;
  }

  render() {
    const { stationList, stationOrder } = this.props;

    const styles = {
      selectedButton: {
        backgroundColor: Colors.white,
        borderWidth: 0,
        padding: 5,
        marginLeft: 5,
        marginRight: 5,
        paddingTop: 7,
        paddingBottom: 5,
      },
      cardStyle: {
        backgroundColor: Colors.grayBg,
        paddingTop: 15,
      },
    };

    return (
      <Card style={styles.cardStyle}>
        <CardSection style={styles.cardStyle}>
          <Button
            onPress={() => this.props.updateStationOrder('distance')}
            selected={this.props.stationOrder === 'distance'}
            style={styles.selectedButton}
          >
            Distance
          </Button>
          <Button
            onPress={() => this.props.updateStationOrder('alphabetical')}
            selected={this.props.stationOrder === 'alphabetical'}
            style={styles.selectedButton}
          >
            A-Z
          </Button>
          <Button
            onPress={() => this.props.updateStationOrder('favorites')}
            selected={this.props.stationOrder === 'favorites'}
            style={styles.selectedButton}
          >
            Favorites
          </Button>
        </CardSection>
        <ListView
          style={{ marginBottom: 53 }}
          enableEmptySections
          dataSource={this.dataSource}
          renderRow={this.renderRow}
        />
      </Card>
    );
  }
}

const mapStateToProps = state => ({
  stationList: state.stationInfo.stationList,
  stationOrder: state.stationInfo.stationOrder,
});

export default connect(mapStateToProps, { updateDeviceLocation, updateStationOrder })(StationList);
