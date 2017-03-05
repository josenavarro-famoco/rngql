import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import {
  ActivityIndicator,
  View,
} from 'react-native';
import App from './App';
import LoginApp from './LoginApp';

import { TOKEN_KEY } from './constants';
import { getItem } from './utils';

export default class extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      loggedIn: false,
      ready: false,
    };

    const networkInterface = createNetworkInterface({
      uri: 'http://192.168.1.12:8080/graphql',
      opts: {
        credentials: 'same-origin',
      },
    });

    networkInterface.use([{
      applyMiddleware(req, next) {
        if (!req.options.headers) {
          req.options.headers = {};  // Create the header object if needed.
        }

        // get the authentication token from local storage if it exists
        getItem(TOKEN_KEY, (err, token) => {
          console.log(token)
          if (token) {
            req.options.headers.authorization = `Bearer ${token}`;
          }
          next();
        });
      }
    }]);

    this.client = new ApolloClient({
      networkInterface,
      dataIdFromObject: r => r.id,
    });
  }

  componentWillMount() {
    getItem(TOKEN_KEY, (err, token) => {
      console.log(err, token)
      if (token) {
        this.setState({ ready: true, loggedIn: true});
      } else {
        this.setState({ ready: true });
      }
    })
  }

  onLogin = () => this.setState({ loggedIn: true });
  onLogout = () => this.setState({ loggedIn: false, token: undefined });

  getComponentToRender = (ready, loggedIn) => {
    if (!ready) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator animating size="large" />
        </View>
      );
    } else if (loggedIn) {
      return <App onLogout={this.onLogout} />;
    } else {
      return <LoginApp onLogin={this.onLogin} />;
    }
  }
  render() {
    return (
      <ApolloProvider client={this.client}>
        {this.getComponentToRender(this.state.ready, this.state.loggedIn)}
      </ApolloProvider>
    );
  }
}
