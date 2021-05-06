import React, { Component} from 'react';
import { StyleSheet, View} from 'react-native';

import { Header} from 'react-native-elements'


class Kepala extends Component{
    render(){
        return(
            <View >
                <Header  leftComponent={{ text: 'Indah Paksi Larasati', style: { color: '#fff', width:600 } }} rightComponent={{ icon: 'settings', color: '#fff' }} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
});


export default Kepala