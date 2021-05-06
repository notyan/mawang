import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {  BarChart, LineChart } from "react-native-chart-kit";
import { Header, ButtonGroup } from "react-native-elements"

import Kepala from '../shared/kepala'

class Stat extends Component {
  constructor(){
    super()
    this.state = {
      data:[20,12,23,18],
      time:2,
    }
    this.updateIndex = this.updateIndex.bind(this)
  }
  
  updateIndex (time) {
    this.setState({time})
  }

  render(){
    const buttons = ['Last Month', 'This Month']
    const { time } = this.state
    const lebar = Dimensions.get('window').width-40;
    const tinggi = Dimensions.get('window').height;
    const data={
      labels: ["W1", "W2", "W3", "W4"],
      datasets: [{
        data: this.state.data
      }]
      
    }
    const chartConfig = {
      backgroundGradientFrom: '#333652',
      backgroundGradientTo: '#333652',
      fillShadowGradient: "#FAD02C",
      fillShadowGradientOpacity: 1,
      color: (opacity = 1) => `rgba(250, 255, 55, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(250, 255, 255, ${opacity})`,
      strokeWidth: 10, // optional, default 3
      barPercentage: 0.5,
    };

    return (
      <View style={styles.container}>
        <Kepala/>
        <View style={styles.content}>
          <ButtonGroup onPress={this.updateIndex} selectedIndex={time} buttons={buttons} containerStyle={{height: 40}}/>
          <View style={styles.box}> 
            <BarChart fromZero={true} data={data} width={lebar} height={220}  yAxisLabel={'$'} chartConfig={chartConfig}/>
          </View>
          <View style={styles.box}> 
            <BarChart fromZero={true} data={data} width={lebar} height={220}  yAxisLabel={'s'} chartConfig={chartConfig}/>
          </View>
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

export default Stat