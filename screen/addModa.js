import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, Picker  } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Button, TextInput  } from 'react-native-paper';
import { Formik } from 'formik'
import * as yup from 'yup'

import { MaterialIcons } from '@expo/vector-icons'

export default function AddModal({ modal, setModal }) {
    const [selectedIndex,setSelectedIndex] = useState(0)

    const buttons = ['Hello', 'World', 'Buttons']
    return(
        <Modal visible={modal} animationType='slide'>
        {/**Header */}
        <View style={styles.header}>
          <MaterialIcons name="arrow-back-ios" size={24} onPress={() => setModal(false)}/>
        </View>

        {/**Content */}
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modal}>
          <Formik selectedIndex={selectedIndex}
                initialValues={{type:selectedIndex, nominal: '', kategori: ''}}
                onSubmit={(values, actions) => {
                    console.log(values)
                    actions.resetForm();
                }}>

                {(props) => (
                    <View>
                        <ButtonGroup onPress={setSelectedIndex} selectedIndex={selectedIndex} buttons={buttons}/>
                        <TextInput mode='flat' placeholder="Nominal" onChangeText={props.handleChange('nominal')} value={props.values.nominal} onBlur={props.handleBlur('nominal')/*Realtime validation after change form*/}/>
                            <Text style={global.errorMsg}>{props.touched.nominal && props.errors.nominal}</Text>
                        <TextInput style={styles.input} placeholder="Kategori" onChangeText={props.handleChange('kategori')} value={props.values.kategori} onBlur={props.handleBlur('kategori')}/>
                            <Text style={global.errorMsg}>{props.touched.kategori && props.errors.kategori}</Text>

                        <Button onPress={props.handleSubmit}> Submit </Button>
                    </View>
                )}
            </Formik>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    )
}

const styles = StyleSheet.create({
    header:{
      height: 40,
      backgroundColor: '#ddd',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
    },
    btnContainer:{
        backgroundColor: '#aaa',
        width:'100%',
        height: 50,
        padding: 1,
    },

    modal:{
      flex:1,
      padding:20,
    },
    btn: {
        width: "40%",
        height: '100%',
        borderRadius: 5,
        paddingHorizontal: 8,
        backgroundColor: "grey",
        marginHorizontal: "1%",
        marginBottom: 6,
    },
  });
