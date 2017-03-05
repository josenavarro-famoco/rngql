import React, { Component, PropTypes } from 'react';
import { View, Button, ActivityIndicator, TextInput, StyleSheet } from 'react-native';
import { graphql } from 'react-apollo';
import { LOGIN_MUTATION } from '../constants/mutations';
import { TOKEN_KEY } from '../constants';
import { saveItem } from '../utils';

class LoginApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      error: undefined,
      username: '',
      password: '',
    }
  }

  onClick = () => {
    this.setState({ loading: true, error: undefined });
    this.props.mutate({
      variables: {
        username: this.state.username,
        password: this.state.password,
      },
    }).then(({ data }) => {
      saveItem(TOKEN_KEY, data.logIn.access_token, this.props.onLogin);
      this.setState({ loading: false })
    }).catch((error) => {
      // console.error('there was an error sending the query', error);
      this.setState({ loading: false, error: error.graphQLErrors[0].message })
    });
  }

  render() {
    return(
      <View style={styles.container}>
        {this.state.loading && <ActivityIndicator animating size="large" />}
        {this.state.error && <Text>{this.state.error}</Text>}
        <TextInput
          style={styles.input}
          keyboardType="email-address"
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          style={styles.input}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          value={this.state.password}
        />
        <Button
          onPress={this.onClick}
          title="Log In"
          color="#841584"
          accessibilityLabel="log In"
          disabled={this.state.loading}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    height: 40,
    marginBottom: 16,
  },
});

LoginApp.propTypes = {
  mutate: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default graphql(LOGIN_MUTATION)(LoginApp);
