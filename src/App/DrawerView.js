import React, { Component, PropTypes } from 'react';
import { Text, View, Button, StyleSheet, Image } from 'react-native';
import { Avatar, Drawer, Divider, COLOR, TYPO } from 'react-native-material-design';

const DrawerView = ({ user, onLogout }) => (
  <Drawer>
    <Drawer.Header image={<Image source={require('./nav.jpg')} />}>
      <View style={styles.header}>
        <Avatar size={80} image={<Image source={{ uri: "http://facebook.github.io/react-native/img/opengraph.png?2" }}/>} />
        <Text style={[styles.text, COLOR.paperGrey50, TYPO.paperFontSubhead]}>{user.username}</Text>
      </View>
    </Drawer.Header>
    <Drawer.Section
      items={[{
        icon: 'power-settings-new',
        value: 'Logout',
        onPress: onLogout,
      }]}
    />
  </Drawer>
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
  },
  header: {
    paddingTop: 16
  },
  text: {
    marginTop: 20
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
