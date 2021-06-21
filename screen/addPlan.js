import React, {useState, Component } from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, TextInput } from 'react-native';
import { ButtonGroup,Button } from 'react-native-elements';
import DropDownPicker from 'react-native-dropdown-picker';
import { Formik } from 'formik'
import * as yup from 'yup'
import * as SQLite from 'expo-sqlite';

import { MaterialIcons } from '@expo/vector-icons'
import PlanModal from  './planModal'

const reviewSchema = yup.object({
  judul: yup.string().required().min(3),
  start: yup.number().required().positive(1),
  target: yup.number().required().positive(1),
  deskripsi: yup.string().required().min(3)
})
const db = SQLite.openDatabase('db.db')
class AddPlan extends Component{
    constructor () {
        super()
        this.state = {
            id: '',
            judul:'',
            start: '',
            target: '',
            deskripsi: '',
        }
    }
      addPlan(data){
        let today = new Date()
        data.id = today.toISOString().slice(0,19).replace(/[-:T]/g,'')
        let query = "INSERT INTO plan (id, judul, nominalAwal, target, deskripsi) VALUES (?,?,?,?,?)"
        let params = [data.id, data.judul, data.start, data.target, data.deskripsi]
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
                  <Formik 
                    initialValues={{judul: '', start:'', target:'', deskripsi:''}} 
                    validationSchema={reviewSchema}
                    onSubmit={(values, actions) => {
                        console.log(values)
                        actions.resetForm();
                        this.addPlan(values)
                        this.props.fetchData()
                    }}>
                      {(props)=>(
                        <View>
                          <TextInput style={styles.input} placeholder="Nama Kegiatan" value={props.values.judul} onBlur={props.handleBlur('judul')} onChangeText={props.handleChange('judul')}/>
                          <Text >{props.touched.judul && props.errors.judul}</Text>
                            <TextInput style={styles.input}  placeholder="Uang Terkumpul" value={props.values.start} onBlur={props.handleBlur('start')} keyboardType="numeric" onChangeText={props.handleChange('start')}/>
                              <Text >{props.touched.start && props.errors.start}</Text>
                            <TextInput style={styles.input}  placeholder="Target Uang" value={props.values.finish} onBlur={props.handleBlur('target')} keyboardType="numeric" onChangeText={props.handleChange('target')}/>
                              <Text >{props.touched.finish && props.errors.finish}</Text>
                            <TextInput style={styles.input} column={5} placeholder="Deskripsi" value={props.values.deskripsi} onBlur={props.handleBlur('deskripsi')} multilne  onChangeText={props.handleChange('deskripsi')}/>
                              <Text >{props.touched.deskripsi && props.errors.deskripsi}</Text>
                            <Button style={{marginTop:120,marginBottom:5}} title="Submit" onPress={()=>{
                                props.handleSubmit()
                                this.props.closeModal()
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