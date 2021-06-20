import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, Picker  } from 'react-native';
import { Overlay, Button } from 'react-native-elements'

import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db')

class  DelTrans extends Component{
    dropData = () =>{
        db.transaction(tx =>{
            tx.executeSql(`DELETE FROM trans WHERE id = ${this.props.identifier}`)
        })
        this.props.closeOverlay()
    }
    render(){
        return(
            <Overlay isVisible={this.props.overlay} onBackdropPress={() => this.props.closeOverlay()}>
                <Text>{this.props.identifier}</Text>
                {/* <Button onPress={() => this.dropData()} ></Button> */}
                <Button onPress={() => this.dropData()} ></Button>
            </Overlay>
        )
    }
}

export default DelTrans