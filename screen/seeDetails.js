import React, {Component, useState} from 'react';
import { StyleSheet, Text, View  } from 'react-native';
import { Overlay  } from 'react-native-elements'
import { Button, ProgressBar, Card, Paragraph } from 'react-native-paper'
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('db.db')


class  SeeDetails extends Component{
    dropPlan = () =>{
        db.transaction(tx =>{
            tx.executeSql(`DELETE FROM plan WHERE id = ${this.props.selectedData.id}`)
        })
        console.log(this.props.selectedData.id)
        this.props.closeOverlay()
    }
    render(){
        return(
            <View style={styles.container}>
                <Overlay overlayStyle={styles.overlay} isVisible={this.props.overlay} onBackdropPress={() => this.props.closeOverlay()}>
                    <Card>
                        <Card.Title title={this.props.selectedData.judul} subtitle={this.props.selectedData.target}  />
                        <Card.Content>
                            <Paragraph>{this.props.selectedData.id}</Paragraph>
                            <Paragraph>{this.props.selectedData.deskripsi}</Paragraph>
                            <ProgressBar progress={Number(this.props.selectedData.nominalAwal)/Number(this.props.selectedData.target)}  />
                        </Card.Content>
                        <Card.Actions>
                            <Button onPress={() => this.props.closeOverlay()}>Cancel</Button>
                            <Button onPress={() => this.dropPlan()}>Delete</Button>
                        </Card.Actions>
                    </Card>
                </Overlay>
            </View>
            
        )
    }
}
const styles = StyleSheet.create({
    overlay: {
      width: 300,
    },
  
  });
export default SeeDetails