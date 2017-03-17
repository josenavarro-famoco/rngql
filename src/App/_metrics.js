import React, { Component, PropTypes } from 'react';
import { Text, View, Button, ActivityIndicator, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import { METRICS } from '../constants/queries';
import Pie from './Pie';
class Metrics extends Component {
  render() {
    if (this.props.data.loading) {
      return <ActivityIndicator animating size="large" />;
    }
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Metrics</Text>
        {/*<Text>Devices: {this.props.data.organizationMetrics.devices_count}</Text>
        <Text>Devices Synced: {this.props.data.organizationMetrics.devices_synced_count}</Text>
        <Text>Devices Not Synced: {this.props.data.organizationMetrics.devices_not_synced_count}</Text>
        <Text>Devices Never Synced: {this.props.data.organizationMetrics.devices_never_synced_count}</Text>
        <Text>Devices In the field: {this.props.data.organizationMetrics.devices_in_the_field_count}</Text>
        <Text>Devices In Stock: {this.props.data.organizationMetrics.devices_in_stock_count}</Text>
        <Text>Devices In Repair: {this.props.data.organizationMetrics.devices_in_repair_count}</Text>*/}
        <Pie data={this.props.data.organizationMetrics} />
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    borderColor: 'red',
    borderWidth: 1,
    width: 300,
    height: 300
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 8,
    paddingBottom: 16
  }
}
const withData = graphql(METRICS, {
  options: ({ organizationId }) => ({
    variables: {
      organizationId
    }
  })
});

export default withData(Metrics);
