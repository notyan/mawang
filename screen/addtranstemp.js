import React, {useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, Picker  } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { Button, TextInput  } from 'react-native-paper';
import { Formik } from 'formik'
import * as yup from 'yup'

import AddTrans from './addTrans'
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
                    <AddTrans  modal={modal} />
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