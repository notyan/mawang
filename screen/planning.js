import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import { FAB } from 'react-native-paper'
import * as SQLite from 'expo-sqlite';

import Card from '../shared/card'
import Kepala from '../shared/kepala'
import PlanModal from  './planModal'
import SeeDetails from './seeDetails';

var idPlan;

const db = SQLite.openDatabase('db.db')
var formPlan;
//default initiate to avoid error
var selectedData = {"id": 1,"judul": "HP", "start": 200000,"finish": 3000000,"deskripsi": "Mau beli HP buat Free Fire"};
class Planning extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      transNom:['a','v','c'],
      overlay: false,
      modal: false,
      data: [],
    }
    this.componentDidMount()
    this.fetchData()
  }
  componentDidMount(){
    this._isMounted = true;
    var query = "SELECT * FROM plan";
    var params = [];
    if(this._isMounted){
      db.transaction((tx) => {
        tx.executeSql(query,params, (tx, results) => {
          if(results.rows._array.length > 0){
            this.setState({data:results.rows._array},console.log("Isi Data pada database" + results.rows._array.length));
          }
          else{
            console.log('data kosong')
          }
        }, (error) => {
          console.log("Warning","Terjadi kesalahan disisi server." + error);
        });
      });
    }
  }
  fetchData = () => {
    this.componentDidMount()
  }
  openModal= (notes) =>{
    this.setState({modal: true})
    formPlan = notes;
  }
  closeOverlay = () =>{
    this.setState({overlay: false})
    this.componentDidMount()
  }
  openOverlay = (id) =>{
    this.setState({overlay: true})
    selectedData = id
  }
  closeModal= () =>{
    this.setState({modal: false})
  }

  render(){
    return (
      <View style={styles.container}>
        <Kepala/>
        <View style={global.container, styles.margin}>
          <PlanModal data={this.state.data} fetchData={this.fetchData} modal={this.state.modal} form={formPlan}  closeModal={this.closeModal} />
          <SeeDetails selectedData={selectedData} fetchData={this.fetchData}  overlay={this.state.overlay} closeOverlay={this.closeOverlay}/>
          <FlatList data={this.state.data} renderItem={({item}) =>(
            <TouchableOpacity onPress={()=>this.openOverlay(item)}>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.judul}</ListItem.Title>
                  <ListItem.Subtitle>{item.target - item.nominalAwal}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )}/>
          
        </View>
          <FAB style={styles.fab} large icon="plus"  onPress={()=>this.openModal()}/>
      </View>
    );
  }
  componentWillUnmount() {
    this.setState = (state,callback)=>{
      return;
    },this._isMounted = false;;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  margin:{
    marginTop: 8,
  },
  fab: {
    position: 'absolute',
    right: 0,
    bottom:0,
    borderRadius: 30,
    backgroundColor: '#5C33F6',
    marginRight: 28,
    marginBottom: 24
  },
  content:{
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    paddingVertical: 10,
  },
});


export default Planning