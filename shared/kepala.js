import React, { Component} from 'react';
import { Text,StyleSheet, View} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header} from 'react-native-elements'
import { DataTable } from 'react-native-paper';

const db = SQLite.openDatabase('db.db')

class Kepala extends Component{
    _isMounted = false;
    constructor(){
        super()
        this.state = {
            stats:[0,0,0],
        }
        this.fetchData()
    }
    
    componentDidMount(){
        this._isMounted = true;
        db.transaction(tx =>{
          tx.executeSql('CREATE TABLE if not exists info (name text PRIMARY KEY not null)')
          //tx.executeSql('Drop TABLE trans ')
        })
    }
    fetchData = () => {
        var query = "SELECT * FROM trans";
        var params = [];
        db.transaction((tx) => {
          tx.executeSql(query,params, (tx, results) => {
            if(results.rows._array.length > 0){
              console.log("Isi Database " + results.rows._array.length)
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
                  }, console.log(this.state.stats))
                }
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

    render(){
        return(
            <View >
                <Header containerStyle={styles.kepala} leftComponent={{ text: 'Indah Paksi Larasati', style: { color: '#fff', width:800, fontWeight: 'bold', fontSize: 22} }} rightComponent={{ icon: 'settings', color: '#fff'}} />
                <DataTable>
                  <DataTable.Header style={styles.row}>
                    <DataTable.Title style={styles.kiri}>Income</DataTable.Title>
                    <DataTable.Title style={styles.tengah}>Expense</DataTable.Title>
                    <DataTable.Title style={styles.kanan} numeric>Transfer</DataTable.Title>
                  </DataTable.Header>
                  <DataTable.Row style={styles.row}>
                    <DataTable.Cell >{this.state.stats[0]}</DataTable.Cell>
                    <DataTable.Cell style={styles.tengah}>{this.state.stats[1]}</DataTable.Cell>
                    <DataTable.Cell numeric>{this.state.stats[2]}</DataTable.Cell>
                  </DataTable.Row>
                </DataTable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    kepala:{
      backgroundColor: 'black'
    },
    kiri: {
      color: '#9ACD32'
    },
    tengah: {
      justifyContent: 'center',
      marginHorizontal: 20,
    },
    kanan: {
      color: '#9ACD32'
    },
    row:{
      height: 30,
      // backgroundColor: '#ddd',
      borderBottomWidth: 0,
      paddingHorizontal: 20
    },
    kepala:{
      backgroundColor: '#5C33F6',
      paddingBottom: 16,
      paddingHorizontal: 20,
      paddingTop: 16
    }
  });


export default Kepala