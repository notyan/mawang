import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, Picker  } from 'react-native';
import { Overlay } from 'react-native-elements'
import {Button, Card, Paragraph} from 'react-native-paper'

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
            <Overlay overlayStyle={styles.overlay} isVisible={this.props.overlay} onBackdropPress={() => this.props.closeOverlay()}>
                <Card>
                        <Card.Title title='Hehe' subtitle="Hehe"  />
                        <Card.Content>
                            <Paragraph>{this.props.identifier}</Paragraph>
                            <Paragraph>{this.props.identifier}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => this.props.closeOverlay()}>Cancel</Button>
                            <Button onPress={() => this.dropPlan()}>Delete</Button>
                        </Card.Actions>
                    </Card>
            </Overlay>
        )
    }
}
const styles = StyleSheet.create({
    overlay: {
      width: 300,
    },
  
});
export default DelTrans