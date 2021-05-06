import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect} from 'react';
import { StyleSheet, Text, TouchableOpacity, View, FlatList, Modal, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';
import { FAB, Provider } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';

import { MaterialIcons } from '@expo/vector-icons'
import Card from '../shared/card'
import { global } from '../styles/global'
import AddModal from  './addModal'
import AddTrans from './addTrans'


const db = SQLite.openDatabase('db.db')

export default function Trans() {
  const[modal, setModal] = useState(false); //Modal 
  const componentWillMount = () =>{
    try{
      db.transaction(tx =>{
        tx.executeSql('CREATE TABLE trans (id INTEGER PRIMARY KEY not null,  type text,  nominal text, name text, note text, category text)')
        //tx.executeSql('DELTE FROM review')
      })
    }catch(err){
      alert(err)
    }
  }
  componentWillMount()

  
  return (
    <View style={global.container}>
      <AddModal modal={modal} setModal={setModal}/>
      {/*ADD TRANSACTION*/}
      {/* <FlatList data={data} renderItem={({item}) =>(
        <TouchableOpacity onPress={() => console.log('good')}>
          <Card>
            <Text > {item.category} </Text>
          </Card>
        </TouchableOpacity>
      )}/> */}
      <Provider>
        <FAB style={styles.fab} icon="plus" onPress={()=>setModal(true)}/>
      </Provider>
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  }, 
});

export default Trans