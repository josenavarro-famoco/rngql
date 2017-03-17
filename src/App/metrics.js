import React, { Component, PropTypes } from 'react';
import { ScrollView } from 'react-native';
import { graphql } from 'react-apollo';
import { METRICS } from '../constants/queries';
import CircularGraph from './CircularGraph';

class Metrics extends Component {
  render() {
    const organizationMetrics = {
      devices_in_repair_count: 23,
      devices_in_stock_count: 74,
      devices_in_the_field_count: 50,
      devices_count: 147,
    }

    return (
      <ScrollView>
        <CircularGraph number={organizationMetrics.devices_in_the_field_count} total={organizationMetrics.devices_count} label="In the field" color="Blue" />
        <CircularGraph number={organizationMetrics.devices_in_stock_count} total={organizationMetrics.devices_count} label="In stock" color="Green" />
        <CircularGraph number={organizationMetrics.devices_in_repair_count} total={organizationMetrics.devices_count} label="In repair" color="Red" />
      </ScrollView>
    );
  }
}

export default Metrics;
