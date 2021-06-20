import React, {useState, Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { ButtonGroup,Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as SQLite from 'expo-sqlite';

import { MaterialIcons } from '@expo/vector-icons'

const db = SQLite.openDatabase('db.db')
class AddTrans extends Component{
    constructor () {
        super()
        this.state = {
            id: '',
            type: '2',
            nominal: '',
            name: '',
            note: '',
            category: 'except',
            date:'',
        }
        this.updateIndex = this.updateIndex.bind(this)
    }
      addReview(data){
        let today = new Date()
        data.date = today.toUTCString().slice(0,17)+today.getHours()+':'+today.getMinutes()
        data.id = today.toISOString().slice(0,19).replace(/[-:T]/g,'')
        //data.id = Math.random()
        console.log(data)
        let query = "INSERT INTO trans (id, type, nominal, name, note, category, date) VALUES (?,?,?,?,?,?,?)"
        let params = [data.id, data.type, data.nominal, data.name, data.note, data.category, data.date]
        db.transaction((tx)=> {
          tx.executeSql(query,params,(tx,results) =>{
            console.log('Data tersimpan')
            });
        }, (error) => {
          console.log(error + ' ERROR')
        })
      }
      updateIndex (type) {
        this.setState({type}, ()=> {
          if(this.state.type == 0.0){
            this.setState({category: 'pendapatan'})
          }
          else if(this.state.type == 1.0){
            this.setState({category: 'except'})
          }
          else if(this.state.type == 2.0){
            this.setState({category: 'transfer'})
          }
        })
        
      }
      
      render () {
        const buttons = ['Income', 'Expense', 'Transfer']
        const { type } = this.state
        const kategori = [
            {label:'Makanan', value:'makanan'},
            {label:'Groceries', value:'groceries'},
            {label:'Daily Goods', value:'goods'},
            {label:'Tagihan', value:'tagihan'},
            {label:'Shopping', value:'shopping'},
            {label:'Utang', value:'utang'},
            {label:'Laundry', value:'laundry'},
            {label:'Liburan', value:'liburan'},
            {label:'Amal', value:'amal'},
            {label:'Pendapatan', value:'pendapatan'},
            {label:'Transfer', value:'transfer'},
            {label:'Pilih Menu', value:'except'}
        ]
        return (
           <View style={[styles.container, {
      // Try setting `flexDirection` to `"row"`.
      flexDirection: "column"
    }]}>
                <ButtonGroup style={styles.box} onPress={this.updateIndex} selectedIndex={type} buttons={buttons} containerStyle={{height: 40,alignSelf: 'stretch'}}/>
                <View style={styles.box}>
                  <TextInput style={styles.input} placeholder="Nama transaksi" onChangeText={value => this.setState({ name: value })}/>
                  <TextInput style={styles.input}  placeholder="Nominal" keyboardType="numeric" onChangeText={value => this.setState({ nominal: value })}/>
                  <TextInput style={styles.input} column={5} placeholder="Notes" multilne  onChangeText={value => this.setState({ note: value })}/>
                  <DropDownPicker items={kategori} defaultValue={this.state.category} containerStyle={{height: 50}} style={{backgroundColor: '#fafafa',marginBottom:5}} itemStyle={{justifyContent: 'flex-start'}}  onChangeItem={item => this.setState({category: item.value})}/>
                  <Button style={{marginTop:120,marginBottom:5}} title="Submit" onPress={()=>{
                      this.addReview(this.state)
                      this.props.closeModal({modal: false})
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

export default AddTrans