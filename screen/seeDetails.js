import React, {Component, useState} from 'react';
import { StyleSheet, Text, View, Modal, TouchableWithoutFeedback, Keyboard, Picker  } from 'react-native';
import { Overlay  } from 'react-native-elements'
import { Button, ProgressBar, Card, Title, Paragraph } from 'react-native-paper'

class  SeeDetails extends Component{
    render(){
        return(
            <View style={styles.container}>
                <Overlay overlayStyle={styles.overlay} isVisible={this.props.overlay} onBackdropPress={() => this.props.closeOverlay()}>
                    <Card>
                        <Card.Title title={this.props.selectedData.judul} subtitle={this.props.selectedData.finish}  />
                        <Card.Content>
                            <Paragraph>{this.props.selectedData.deskripsi}</Paragraph>
                            <ProgressBar progress={Number(this.props.selectedData.start)/Number(this.props.selectedData.finish)}  />
                        </Card.Content>
                        <Card.Actions>
                            <Button>Cancel</Button>
                            <Button>Delete</Button>
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