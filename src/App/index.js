import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, Button, DrawerLayoutAndroid, ActivityIndicator, Picker } from 'react-native';
import { graphql } from 'react-apollo';
import { ORGANIZATIONS } from '../constants/queries';
import { removeItem } from '../utils';
import { TOKEN_KEY } from '../constants';

import DrawerView from './DrawerView';
import Metrics from './metrics';

import Icon from 'react-native-vector-icons/MaterialIcons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      selectedOrganization: -1,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && this.props.data.loading) {
      this.setState({ ready: true });
    }
  }

  onLogout = () => {
    this.props.onLogout();
    removeItem(TOKEN_KEY);
  }

  onIconClicked = () => {
    if (this.drawer) {
      this.drawer.openDrawer();
    }
  }

  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <DrawerView onLogout={this.onLogout} user={this.props.data.currentUser} />}
        ref={(drawer) => this.drawer = drawer}
      >
        <Icon.ToolbarAndroid title="Home" navIconName="menu" style={styles.toolbar} onIconClicked={this.onIconClicked} />
        <ScrollView style={styles.outer}>
          {this.props.data.loading && <ActivityIndicator animating size="large" />}
          {this.state.ready && !this.props.data.loading && !this.props.data.error &&
            <Picker
              selectedValue={this.state.selectedOrganization}
              onValueChange={(value) => this.setState({ selectedOrganization: value })}
            >
              {this.props.data.organizations.map(organization => <Picker.Item key={`picker-org-${organization.id}`} label={organization.name} value={organization.id} />)}
            </Picker>
          }
          {this.state.selectedOrganization && this.state.selectedOrganization > 0 ? <Metrics organizationId={this.state.selectedOrganization} /> : <Text>Select an organization</Text>}
        </ScrollView>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = {
  outer: { flex: 1, padding: 10 },
  toolbar: {
    backgroundColor: '#e0e0e0',
    height: 56,
  },
}

export default graphql(ORGANIZATIONS)(App);
