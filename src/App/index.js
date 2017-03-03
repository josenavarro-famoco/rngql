import React, { Component, PropTypes } from 'react';
import { Text, ScrollView, Button, DrawerLayoutAndroid, ToolbarAndroid, ActivityIndicator } from 'react-native';
import { graphql, ApolloProvider } from 'react-apollo';
import { CURRENT_USER, ORGANIZATIONS } from '../constants/queries';
import { removeItem } from '../utils';
import { TOKEN_KEY } from '../constants';

import DrawerView from './DrawerView';

import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = {
  outer: { flex: 1, padding: 10 },
  wrapper: { height: 40, marginBottom: 15, flex: 1, flexDirection: 'row' },
  header: { fontSize: 20 },
  subtextWrapper: { flex: 1, flexDirection: 'row' },
  votes: { color: '#999' },
  toolbar: {
    backgroundColor: '#e9eaed',
    height: 56,
  },
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: false
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
    console.log('clicked')
    if (this.drawer) {
      console.log('with dra')
      this.drawer.openDrawer();
    }
  }
  render() {
    return (
      <DrawerLayoutAndroid
        drawerWidth={300}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <DrawerView onLogout={this.onLogout} />}
        ref={(drawer) => this.drawer = drawer}
      >
        <Icon.ToolbarAndroid title="Home" navIconName="menu" style={styles.toolbar} onIconClicked={this.onIconClicked} />
        {/*<ToolbarAndroid title="Home" navIcon={require('./menu.png')} onIconClicked={this.onIconClicked} style={styles.toolbar} />*/}
        <ScrollView style={styles.outer}>
          {this.props.data.loading && <ActivityIndicator animating size="large" />}
          {this.state.ready && !this.props.data.loading && !this.props.data.error && <Text>{JSON.stringify(this.props.data.organizations)}</Text>}
        </ScrollView>
      </DrawerLayoutAndroid>
    );
  }
}
export default graphql(ORGANIZATIONS)(App);
