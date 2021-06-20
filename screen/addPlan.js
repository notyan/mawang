import React, {useState, Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { ButtonGroup,Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as SQLite from 'expo-sqlite';

import { MaterialIcons } from '@expo/vector-icons'
import PlanModal from  './planModal'

const db = SQLite.openDatabase('db.db')
class AddPlan extends Component{
    constructor () {
        super()
        this.state = {
            id: '',
            judul:'',
            nominalAwal: '',
            target: '',
            deskripsi: '',
        }
    }
      addPlan(data){
        let today = new Date()
        data.id = today.toISOString().slice(0,19).replace(/[-:T]/g,'')
        console.log(data)
        let query = "INSERT INTO plan (id, judul, nominalAwal, target, deskripsi) VALUES (?,?,?,?,?)"
        let params = [data.id, data.judul, data.nominalAwal, data.target, data.deskripsi]
        db.transaction((tx)=> {
          tx.executeSql(query,params,(tx,results) =>{
            console.log('Data tersimpan')
            });
        }, (error) => {
          console.log(error + ' ERROR')
        })
      }      
      render () {
        return (
           <View style={[styles.container, {
            // Try setting `flexDirection` to `"row"`.
            flexDirection: "column"
            }]}>
                <View style={styles.box}>
                    <TextInput style={styles.input} placeholder="Nama Kegiatan" onChangeText={value => this.setState({ judul: value })}/>
                    <TextInput style={styles.input}  placeholder="Uang Terkumpul" keyboardType="numeric" onChangeText={value => this.setState({ nominalAwal: value })}/>
                    <TextInput style={styles.input}  placeholder="Target Uang" keyboardType="numeric" onChangeText={value => this.setState({ target: value })}/>
                    <TextInput style={styles.input} column={5} placeholder="Deskripsi" multilne  onChangeText={value => this.setState({ deskripsi: value })}/>
                    <Button style={{marginTop:120,marginBottom:5}} title="Submit" onPress={()=>{
                        this.addPlan(this.state)
                        this.props.closeModal()
                        this.props.fetchData()
                    }}/>
                </View>
            </View> 
        )
      }

   
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    flexDirection:"column"
  },
  tombol:{
    backgroundColor: '#12ff',
    justifyContent: 'center'
  },
  input:{
    borderWidth: 1,
    paddingVertical:5,
    paddingHorizontal:5,
    alignSelf: 'stretch',
    marginBottom:5,
    borderRadius:6,
    borderColor: '#4444',
  },
box:{
 marginTop:50,
  borderWidth: 1,
  padding: 15,
  borderRadius:10,
  borderColor: 'powderblue',
  justifyContent: 'center',


}
});

export default AddPlan