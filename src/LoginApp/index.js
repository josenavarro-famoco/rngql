import React, { Component, PropTypes } from 'react';
import { Text, View, Button, AsyncStorage, ActivityIndicator, TextInput } from 'react-native';
import { graphql, ApolloProvider } from 'react-apollo';
import { LOGIN_MUTATION } from '../constants/mutations';
import { TOKEN_KEY } from '../constants';
import { saveItem } from '../utils';

const styles = {
  outer: { paddingTop: 32, paddingLeft: 10, paddingRight: 10 },
  wrapper: { height: 40, marginBottom: 15, flex: 1, flexDirection: 'row' },
  header: { fontSize: 20 },
  subtextWrapper: { flex: 1, flexDirection: 'row' },
  votes: { color: '#999' },
}

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
    this.setState({ loading: true, error: undefined })
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
    })
  }

  render() {
    return(
      <View style={styles.outer}>
        {this.state.loading && <ActivityIndicator animating size="large" />}
        {this.state.error && <Text>{this.state.error}</Text>}
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(username) => this.setState({username})}
          value={this.state.username}
        />
        <TextInput
          secureTextEntry
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
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

LoginApp.propTypes = {
  mutate: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default graphql(LOGIN_MUTATION)(LoginApp);
