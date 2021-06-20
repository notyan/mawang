import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { ListItem, LinearProgress,  } from 'react-native-elements'
import Card from '../shared/card'
import Kepala from '../shared/kepala'
import SeeDetails from './seeDetails';
var selectedData;
var data = [
  {   "id": 1,
      "judul": "HP",
      "start": 200000,
      "finish": 3000000,
      "deskripsi": "Mau beli HP buat Free Fire"
  },
  {   "id": 2,
      "judul": "Nikah",
      "start": 3000000,
      "finish": 100000000,
      "deskripsi": "Rencana nikah tahun depan"
  },
  {   "id": 3,
      "judul": "Liburan",
      "start": 0,
      "finish": 5000000,
      "deskripsi": "Bismillah ke Marina Bay Sands"
  },
  {   "id": 4,
      "judul": "Beli Apartemen",
      "start": 77000000,
      "finish": 399000000,
      "deskripsi": "Buat dikontrakin"
  }
]

class Planning extends Component {
  constructor(){
    super()
    this.state = {
      transNom:['a','v','c'],
      overlay: false,
    }
  }
  closeOverlay = () =>{
    this.setState({overlay: false})
  }
  openOverlay = (id) =>{
    this.setState({overlay: true})
    selectedData = id
    console.log(id)
  }

  render(){
    return (
      <View style={styles.container}>
        <Kepala/>
        <View style={global.container}>
          <SeeDetails selectedData={selectedData}  overlay={this.state.overlay} closeOverlay={this.closeOverlay}/>
          <FlatList data={data} renderItem={({item}) =>(
            <TouchableOpacity onPress={()=>this.openOverlay(item)}>
              <ListItem bottomDivider>
                <ListItem.Content>
                  <ListItem.Title>{item.judul}</ListItem.Title>
                  <ListItem.Subtitle>{item.finish - item.start}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
              </ListItem>
            </TouchableOpacity>
          )}/>
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


export default Planning