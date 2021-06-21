import { StatusBar } from 'expo-status-bar';
import React, { Component} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from 'react-native';
import { Provider, List } from 'react-native-paper';
import { Header, FAB } from 'react-native-elements'
import * as SQLite from 'expo-sqlite';

import Kepala from '../shared/kepala'
import { global } from '../styles/global'
import AddModal from  './addModal'
import DelTrans from './delTrans';

const db = SQLite.openDatabase('db.db')
var identifier;
var form;

class  Trans extends Component {
  _isMounted = false;
  constructor () {
    super()
    this.state = {
        modal: false,
        overlay: false,
        data:[],
      }
    this.closeModal()
    this.fetchData()
    this.componentDidMount()
  }
  openModal =(form) =>{
    this.setState({modal: true})
    form = form;
  }
  closeModal = () => {
    this.componentDidMount()
    this.setState({modal: false})
  }
  closeOverlay = () =>{
    this.setState({overlay: false})
    this.componentDidMount()
  }
  openOverlay = (id) =>{
    this.setState({overlay: true})
    identifier = id
    this.componentDidMount()
    console.log(id)
  }

  componentDidMount(){
    this._isMounted = true;
    this.setState({modal: false})
    db.transaction(tx =>{
      tx.executeSql('CREATE TABLE if not exists trans (id text PRIMARY KEY not null,  type text,  nominal text, name text, note text, category text, date text)')
      tx.executeSql('CREATE TABLE if not exists plan (id text PRIMARY KEY not null,  judul text,  nominalAwal text, target text, deskripsi text)')
      //tx.executeSql('Drop TABLE trans ')
      //tx.executeSql('Drop TABLE plan ')
    })
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
    return (
      <View style={styles.container}>
        <Kepala/>
        <View style={global.container, styles.content}>
          <AddModal modal={this.state.modal} form={form} fetchData={this.fetchData} closeModal={this.closeModal} />
          {/*ADD TRANSACTION*/}
          <DelTrans data={this.state.data} identifier={identifier} overlay={this.state.overlay} closeOverlay={this.closeOverlay}/>
          <FlatList style={styles.flatlist} data={this.state.data} renderItem={({item}) =>(
            <TouchableOpacity onPress={()=>this.openOverlay(item.id)}>
              <List.Item style={styles.list}
                titleStyle={{color: item.type == 0 ? 'green' :  item.type == 1 ? 'red' : 'blue', textAlign: 'left'}}
                title={item.name}
                  description={item.type == 0 ? "Rp" + item.nominal + "\n" + item.date + ' income'    :  item.type == 1 ? "Rp" + item.nominal + "\n" + item.date + ' expense'   : "Rp" + item.nominal + "\n" + item.date + ' transfer'}
                  left={props => <List.Icon   {...props}  icon={item.type == 0 ? 'cash-plus' :  item.type == 1 ? 'cash-minus' : 'cash-refund' }style={styles.icon} />}/>
            </TouchableOpacity>
          )}/>
          
        </View>
            <FAB style={styles.fab} title="+" color="#5C33F6" placement="right" onPress={()=>this.openModal(0)}/>
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
  icon:{ 
    marginHorizontal:0,
  },
  content:{
    marginVertical: 8,
    marginHorizontal: 16,
    backgroundColor: 'green',
  },
  fab: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#5C33F6',
    marginRight: 28,
    marginBottom: 24
  },
  titleItem: {
    color: 'white',
    fontSize: 16
  },
  list:{
    backgroundColor: 'white'
  }
});

export default Trans;