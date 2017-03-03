import React, { Component, PropTypes } from 'react';
import { Text, View, Button } from 'react-native';

const DrawerView = ({ onLogout }) => (
  <View style={{flex: 1, backgroundColor: '#fff'}}>
    <Text style={{margin: 10, fontSize: 15, textAlign: 'left'}}>Drawer!</Text>
    <Button
      onPress={onLogout}
      title="Logout"
      color="#841584"
    />
  </View>
)

export default DrawerView;
