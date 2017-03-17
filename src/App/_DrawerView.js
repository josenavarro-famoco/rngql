import React, { Component, PropTypes } from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';

const DrawerView = ({ user, onLogout }) => (
  <View style={styles.container}>
    <Text style={styles.text}>Hello {user.username}</Text>
    <Button
      onPress={onLogout}
      title="Logout"
      color="#841584"
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 8,
  },
  text: {
    paddingBottom: 16,
    fontSize: 15
  }
});

DrawerView.defaultProps = {
  user: {
    username: '',
    email: ''
  },
  onLogout: () => {}
}

export default DrawerView;
