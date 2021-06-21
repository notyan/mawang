import React, {useState, Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { ButtonGroup,Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as SQLite from 'expo-sqlite';

import { MaterialIcons } from '@expo/vector-icons'

const reviewSchema = yup.object({
  nama: yup.string().required().min(3),
  nominal: yup.number().required().positive(1),
  note: yup.string().required().min(3)
})
const db = SQLite.openDatabase('db.db')
class AddTrans extends Component{
    constructor () {
        super()
        this.state = {
            id: '',
            type: 1.0,
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
              flexDirection: "column"
            }]}>
                <ButtonGroup style={styles.box} onPress={this.updateIndex} selectedIndex={type} buttons={buttons} containerStyle={{height: 40,alignSelf: 'stretch'}}/>
                <View style={styles.box}>
                  <Formik 
                    initialValues={{nama: '', nominal:'', note:''}} 
                    validationSchema={reviewSchema}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        actions.resetForm();
                        this.addReview(values)
                        this.props.fetchData()
                    }}>
                      {(props)=>(
                        <View>
                          <TextInput style={styles.input} placeholder="Nama transaksi" value={props.values.nama} onBlur={props.handleBlur('nama')} onChangeText={props.handleChange('nama')}/>
                            <Text >{props.touched.nama && props.errors.nama}</Text>
                          <TextInput style={styles.input}  placeholder="Nominal" keyboardType="numeric" value={props.values.nominal} onBlur={props.handleBlur('nominal')} onChangeText={props.handleChange('nominal')}/>
                            <Text >{props.touched.nominal && props.errors.nominal}</Text>
                          <TextInput style={styles.input} column={5} placeholder="Notes" multilne value={props.values.note} onBlur={props.handleBlur('note')} onChangeText={props.handleChange('note')}/>
                            <Text >{props.touched.note && props.errors.note}</Text>
                          <DropDownPicker items={kategori} defaultValue={this.state.category} containerStyle={{height: 50}} style={{backgroundColor: '#fafafa',marginBottom:5}} itemStyle={{justifyContent: 'flex-start'}}  onChangeItem={item => this.setState({category: item.value})}/>
                          <Button style={{marginTop:120,marginBottom:5, backgroundColor: '#5C33F6'}} title="Submit" onPress={()=>{
                              props.handleSubmit()
                              this.props.closeModal({modal: false})
                                
                          }}/>
                        </View>
                          
                      )}
                  </Formik>
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
    backgroundColor: '#5C33F6',
    justifyContent: 'center'
  },
  input:{
    height: 48,
    borderWidth: 1,
    paddingVertical:5,
    paddingHorizontal:5,
    alignSelf: 'stretch',
    marginBottom:32,
    borderRadius:6,
    borderColor: '#4444',
    fontSize: 18
  },
box:{
 marginTop:50,
  borderWidth: 1,
  padding: 20,
  borderRadius:10,
  borderColor: '#5C33F6',
  justifyContent: 'center',
}
});

export default AddTrans