import React, { Component} from 'react';
import { Text,StyleSheet, View} from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header} from 'react-native-elements'

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
                <Header  leftComponent={{ text: 'Indah Paksi Larasati', style: { color: '#fff', width:600 } }} rightComponent={{ icon: 'settings', color: '#fff' }} />
                <Text style={styles.kepalakau}>{'\t'} Income {"\t\t\t\t\t\t\t\t\t"} Expense {"\t\t\t\t\t\t\t\t\t"} Transfer </Text>
                <Text>{'\t'} {this.state.stats[0]} {"\t\t\t\t\t\t\t\t\t\t\t"} {this.state.stats[1]} {"\t\t\t\t\t\t\t\t\t\t\t"} {this.state.stats[2]}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    kepalakau: {
      backgroundColor: '#b17179',
    }
});


export default Kepala