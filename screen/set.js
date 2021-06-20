import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextComponent, View } from 'react-native';
import Card from '../shared/card'
import Kepala from '../shared/kepala'

class Set extends Component {
  constructor(){
    super()
    this.state = {
      transNom:['a','v','c'],
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Kepala/>
        <View style={global.container}>
          <Text>Weekly Plan</Text>
          <Card hehe={this.state.transNom}/>
          <Text>Monthly Plan</Text>
          <Card hehe={this.state.transNom}/>
        </View>
      </View>
    );
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    paddingVertical: 10,
  }
});

export default Set