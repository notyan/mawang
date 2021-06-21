import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, Picker  } from 'react-native';

import { Formik } from 'formik'
import * as yup from 'yup'

import AddTrans from './addTrans'
import { MaterialIcons } from '@expo/vector-icons'

class  AddModal extends Component {
    constructor () {
        super()
        this.state = {
            selectedIndex: 0,
          }
        this.componentDidMount()
        this.fetchData()
    }
    componentDidMount(){

    }
    fetchData = () => {
        this.componentDidMount()
    }
    render(){
        return(
            <Modal  transparent={true} visible={this.props.modal} animationType='slide'>
                {/**Header */}
                <View style={styles.header}>
                    <MaterialIcons name="arrow-back-ios" size={24} onPress={() => this.props.closeModal()}/>
                </View>
        
                {/**Content */}
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.modal}>
                        <AddTrans modal={this.props.modal} fetchData={this.props.fetchData} closeModal={this.props.closeModal} />
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }  
    
}

const styles = StyleSheet.create({
    header:{
        marginTop:60,
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
      backgroundColor: 'white',
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

export default AddModal