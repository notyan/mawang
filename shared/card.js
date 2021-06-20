import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function Card(props){
    return(
        <View style={styles.card}>
            <View style={styles.cardcontent}>
                <Text>{props.hehe}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    card:{
        borderRadius: 6,
        elevation: 3,
        shadowOffset: {widht:1, height:1},
        shadowColor: '#333',
        shadowOpacity: 0.3,
        shadowRadius:2,
        margin: 3,
        
        backgroundColor: "#008891", //light cyan
    },
    cardcontent:{
        marginHorizontal: 16,
        marginVertical: 16,
    },
})