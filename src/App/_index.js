import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, Button, DrawerLayoutAndroid, ActivityIndicator, Picker } from 'react-native';
import { graphql } from 'react-apollo';
import { ORGANIZATIONS } from '../constants/queries';
import { saveItem, removeItem, getItem } from '../utils';
import { TOKEN_KEY, ORGANIZATION_KEY } from '../constants';

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

  componentDidMount() {
    getItem(ORGANIZATION_KEY, (err, organizationId) => {
      console.log(err, organizationId)
      if (organizationId) {
        this.onSelectedOrganization(organizationId);
      }
    })
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.data.loading && this.props.data.loading) {
      this.setState({ ready: true });
      console.log(nextProps.data.organizations)
      if (nextProps.data.organizations.length > 0) {
        this.onSelectedOrganization(nextProps.data.organizations[0].id)
      }
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

  onSelectedOrganization = (organizationId) => {
    saveItem(ORGANIZATION_KEY, organizationId);
    this.setState({ selectedOrganization: organizationId })
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
              onValueChange={this.onSelectedOrganization}
            >
              {this.props.data.organizations.map(organization => <Picker.Item key={`picker-org-${organization.id}`} label={organization.name} value={organization.id} />)}
            </Picker>
          }
          {this.state.selectedOrganization && this.state.selectedOrganization > 0 && <Metrics organizationId={this.state.selectedOrganization} />}
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
