import { StyleSheet} from 'react-native';

export const  global = StyleSheet.create({
    container: {
        flex:1,
        padding: 20,
    },
    header:{
      height: 40,
      backgroundColor: '#ddd',
      paddingTop: 8,
      paddingBottom: 8,
      paddingLeft: 10,
    },
    titleText:{
      fontFamily:'Train-One',
      fontSize: 20,
      color: '#e7e7de' //krem
    },
    paragraph:{
        marginVertical:8,
        lineHeight:20,
    },
    input:{
      borderWidth: 1,
      borderColor: '#0f3057',
      padding: 8,
      fontSize: 18,
      borderRadius: 6,
    },
    errorMsg: {
      color: '#008891',
      marginTop: 2,
      fontWeight: 'bold',
      marginBottom: 4,
    }
  });
