import React, { Component, PropTypes } from 'react';
import { Text, View, ScrollView, Button, DrawerLayoutAndroid, ActivityIndicator, Picker } from 'react-native';
import { graphql } from 'react-apollo';
import { ORGANIZATIONS } from '../constants/queries';
import { saveItem, removeItem, getItem } from '../utils';
import { TOKEN_KEY, ORGANIZATION_KEY } from '../constants';
import { Toolbar } from 'react-native-material-design';

import DrawerView from './DrawerView';
import Metrics from './metrics';

import Icon from 'react-native-vector-icons/MaterialIcons';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false,
      selectedOrganization: -1,
      title: 'Metrics'
    }
  }

  componentWillReceiveProps(nextProps) {
    // if (!nextProps.data.loading && this.props.data.loading) {
    //   this.setState({ ready: true });
    // }
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
    const currentUser = { username: 'd', email: 's'}
    const organizations = [
      {
        id: 1,
        name: 1,
      }
    ];
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <DrawerView onLogout={this.onLogout} user={currentUser} />}
        ref={(drawer) => this.drawer = drawer}
      >
        <View style={styles.outer}>
          <Toolbar title={this.state.title} icon="menu" onIconPress={this.onIconClicked} />
          <View style={styles.content}>
            <Metrics organizationId={this.state.selectedOrganization} />
          </View>
        </View>
      </DrawerLayoutAndroid>
    );
  }
}

const styles = {
  outer: {
    flex: 1,
    backgroundColor: '#e9e9e9',
  },
  content: {
    flex: 1,
    marginTop: 56,
  },
}

export default App;
