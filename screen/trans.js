import { StatusBar } from 'expo-status-bar';
import React, { Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Provider, List } from 'react-native-paper';
import { Header, FAB } from 'react-native-elements'
import * as SQLite from 'expo-sqlite';

import Kepala from '../shared/kepala'
import { global } from '../styles/global'
import AddModal from  './addModal'
import { TouchableHighlightBase } from 'react-native';


const db = SQLite.openDatabase('db.db')

class  Trans extends Component {
  _isMounted = false;
  constructor () {
    super()
    this.state = {
        modal: false,
        data:[],
      }
    this.closeModal()
    this.fetchData()
    this.componentDidMount()
  }

  closeModal = () => {
    this.componentDidMount()
    //this.setState({modal: false})
  }

  componentDidMount(){
    this._isMounted = true;
    this.setState({modal: false})
    db.transaction(tx =>{
      tx.executeSql('CREATE TABLE if not exists trans (id text PRIMARY KEY not null,  type text,  nominal text, name text, note text, category text, date text)')
      //tx.executeSql('Drop TABLE trans ')
    })
    //this.fetchData()
    var query = "SELECT * FROM trans";
    var params = [];
    if(this._isMounted){
      db.transaction((tx) => {
        tx.executeSql(query,params, (tx, results) => {
          if(results.rows._array.length > 0){
            this.setState({data:results.rows._array},console.log("Isi Data " + results.rows._array.length));
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
  
  render(){
    console.log(this.state.data)
    return (
      <View style={styles.container}>
        <Kepala/>
        <View style={global.container}>
          <AddModal modal={this.state.modal} fetchData={this.fetchData} closeModal={this.closeModal} />
          {/*ADD TRANSACTION*/}
          <FlatList data={this.state.data} renderItem={({item}) =>(
            <TouchableOpacity onPress={() => console.log('item')}>
              <List.Item style={styles.list}
                titleStyle={{color: item.type == 0 ? 'green' :  item.type == 1 ? 'red' : 'blue'}}
                title={item.name  +'  '+ item.nominal}
                  description={item.type == 0 ? item.date + ' income' +   "\n" + item.note  :  item.type == 1 ? item.date + ' expense' +   "\n" + item.note  : item.date + ' transfer' +   "\n" + item.note}
                  left={props => <List.Icon {...props} icon={item.type == 0 ? 'cash-plus' :  item.type == 1 ? 'cash-minus' : 'cash-refund'} />}/>
            </TouchableOpacity>
          )}/>
          
        </View>
            <FAB style={styles.fab} title="Add +" color="#FAD02C" placement="right" onPress={()=>this.setState({modal: true})}/>
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
    backgroundColor: 'white',
  },
  fab: {
    position: 'absolute',
    borderRadius: 8,
  },
  titleItem: {
    color: 'white',
  },
  list:{
    backgroundColor: 'white'
  }
});

export default Trans;