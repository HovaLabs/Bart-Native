import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { Button, CardSection } from './common';
import { updateStationListFilter } from '../actions';

const StationsFilter = props => (
  <CardSection>
    <Button
      onPress={() => props.updateStationListFilter('alphabetical')}
      selected={props.stationOrder === 'alphabetical'}
    >
      A-Z
    </Button>
    <Button
      onPress={() => props.updateStationListFilter('distance')}
      selected={props.stationOrder === 'distance'}
    >
      Distance
    </Button>
    <Button
      onPress={() => props.updateStationListFilter('favorites')}
      selected={props.stationOrder === 'favorites'}
    >
      Favorites
    </Button>
  </CardSection>
);

StationsFilter.propTypes = {
  stationOrder: PropTypes.string.isRequired,
  updateStationListFilter: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  stationOrder: state.stationInfo.stationOrder,
});

export default connect(mapStateToProps, { updateStationListFilter })(StationsFilter);
