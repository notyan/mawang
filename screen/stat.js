import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import {  BarChart, LineChart } from "react-native-chart-kit";
import { Header, ButtonGroup } from "react-native-elements"
import * as SQLite from 'expo-sqlite';
import Kepala from '../shared/kepala'
const db = SQLite.openDatabase('db.db')

class Stat extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      transaction: [],
      transDate:[],
      transNom:[],
      transType:[],
      stats:[0,0,0],
      data:[],
      time:1,
    }
    this.fetchData()
    this.componentDidMount()
    this.updateIndex = this.updateIndex.bind(this)
  }
  componentDidMount(){
    this._isMounted = true;
  }

  
  fetchData = () => {
    var query = "SELECT * FROM trans";
    var params = [];
    db.transaction((tx) => {
      tx.executeSql(query,params, (tx, results) => {
        if(results.rows._array.length > 0){
          let transTemp = [0,0,0];
          for (let i = 0; i< results.rows._array.length; i++){
            
            if(results.rows.item(i).type == 0.0){
              transTemp[0] += parseInt(results.rows.item(i).nominal)
              this.setState({
                stats: transTemp
              })
            }else if(results.rows.item(i).type == 1.0){
              transTemp[1] += parseInt(results.rows.item(i).nominal)
              this.setState({
                stats: transTemp
              })
            }else if(results.rows.item(i).type == 2.0){
              transTemp[2] += parseInt(results.rows.item(i).nominal)
              this.setState({
                stats: transTemp
              })
            }
            this.setState({
              transDate: [...this.state.transDate, results.rows.item(i).date],
              transNom: [...this.state.transNom, results.rows.item(i).nominal],
              transType: [...this.state.transType, results.rows.item(i).type],
            })
          } 
        }
        else{
          console.log('data kosong')
        }
      }, (error) => {
        console.log("Warning","Terjadi kesalahan disisi server." + error);
      });
    });
  }


  updateIndex (time) {
    this.setState({time})
    console.log('Bulan Updated')
  }


  render(){
    console.log(this.state.stats)
    const buttons = ['Monthly', 'Daily']
    const { time } = this.state
    const lebar = Dimensions.get('window').width-40;
    const data={
      labels: ['Income', "Expense", "Transfer"],
      datasets: [{
        data: this.state.stats
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
          <ButtonGroup style={styles.tombol} onPress={this.updateIndex} selectedIndex={time} buttons={buttons} containerStyle={{height: 40}}/>
          <View style={styles.box}> 
            <BarChart fromZero={true} data={data} width={lebar} height={210}  chartConfig={chartConfig}/>
          </View>
          <View style={styles.box}> 
            <BarChart fromZero={true} data={data} width={lebar} height={210}  chartConfig={chartConfig}/>
          </View>
        </View>
      </View>
      
    );
  }
  componentWillUnmount() {
    this._isMounted = false;
    this.setState = (state,callback)=>{
      return;
  };
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    marginTop: 8,
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    paddingVertical: 8,
  },
  tombol:{
    height: 20,
    backgroundColor: '#b17179'
  }
});

export default Stat