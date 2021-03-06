import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, FlatList, View, Dimensions, ScrollView } from 'react-native';
import {  PieChart,  } from "react-native-chart-kit";
import { DataTable } from 'react-native-paper';
import * as SQLite from 'expo-sqlite';
import Kepala from '../shared/kepala'
const db = SQLite.openDatabase('db.db')
var deskripsi = [
  {key: 'Makanan', value:0},
  {key: 'Groceries', value:0},
  {key: 'Daily Goods', value:0},
  {key: 'Tagihan', value:0},
  {key: 'Shopping', value:0},
  {key: 'Cicilan', value:0},
  {key: 'Laundry', value:0},
  {key: 'Liburan', value:0},
  {key: 'Amal', value:0},
]

class Sum extends Component {
  _isMounted = false;
  constructor(){
    super()
    this.state = {
      categori:[0,0,0,0,0,0,0,0,0],
      transDate:[],
      transNom:[],
      transType:[],
      transCat:[],
      expenseTotal: [0,0,0,0,0,0,0,0,0],
      
    }
    
    this.componentDidMount()
    this.fetchData()
  }
  componentDidMount(){
    this._isMounted = true;
  }

  fetchData = () => {
    var query = "SELECT * FROM trans"; var params = [];
    db.transaction((tx) => {
      tx.executeSql(query,params, (tx, results) => {
        if(results.rows._array.length > 0){
          let transTemp = [0,0,0,0,0,0,0,0,0];
          let expense = 0;
          let other = 0;
          let percent= [0,0,0,0,0,0,0,0,0];
          for (let i = 0; i< results.rows._array.length; i++){
            expense += parseInt(results.rows.item(i).nominal)
            if(results.rows.item(i).category == "transfer" || results.rows.item(i).category == "pendapatan"){
              other += parseInt(results.rows.item(i).nominal)
            }
            if(results.rows.item(i).category == "makanan"){
              transTemp[0] += parseInt(results.rows.item(i).nominal)
              this.setState({ categori: transTemp})
            }else if(results.rows.item(i).category == "groceries"){
              transTemp[1] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }else if(results.rows.item(i).category == "goods"){
              transTemp[2] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }else if(results.rows.item(i).category == "tagihan"){
              transTemp[3] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }else if(results.rows.item(i).category == "shopping"){
              transTemp[4] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }else if(results.rows.item(i).category == "utang"){
              transTemp[5] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }else if(results.rows.item(i).category == "laundry"){
              transTemp[6] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }else if(results.rows.item(i).category == "liburan"){
              transTemp[7] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }else if(results.rows.item(i).category == "amal"){
              transTemp[8] += parseInt(results.rows.item(i).nominal)
              this.setState({categori: transTemp})
            }
            this.setState({
              transDate: [...this.state.transDate, results.rows.item(i).date],
              transNom: [...this.state.transNom, results.rows.item(i).nominal],
              transType: [...this.state.transType, results.rows.item(i).type],
              transCat: [...this.state.transCat, results.rows.item(i).category],
            })
            percent = [...transTemp]
          }
          
          for(let i = 0;i <transTemp.length;i++){
            percent[i] = Math.round((percent[i]*100)/(expense-other))
            this.setState({ expenseTotal: percent})
          }
          let jumlah = [...transTemp];
          for(var i in jumlah){
            this.setState({ expenseTotal: percent})
            deskripsi[i].value = jumlah[i]
          }
        }
        else{
          console.log('data kosong')
        }
      }, (error) => {
        console.log("Warning","Terjadi kesalahan disisi server." + error);
      });
    });
  }
  
  spreader = ({deskripsi}) => {
    Object.entries(deskripsi).map(([key,value])=><Text>key:{key},value:{value}</Text>)
  }
  

  render(){
    const lebar = Dimensions.get('window').width-40;
    const data = [
      { name: "% Makanan",    nominal:  Number(this.state.expenseTotal[0]), color: "#69253f",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
      { name: "% Groceries",  nominal: Number(this.state.expenseTotal[1]), color: "#893245",
        legendFontColor: "#7F7F7F",legendFontSize: 12
      },
      { name: "% Daily Goods",  nominal: Number(this.state.expenseTotal[2]), color: "#ba4b51",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
      { name: "% Tagihan",  nominal: Number(this.state.expenseTotal[3]), color: "#fe7460",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
      { name: "% Shopping",  nominal: Number(this.state.expenseTotal[4]), color: "#ffaf6e",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
      { name: "% Cicilan",  nominal: Number(this.state.expenseTotal[5]), color: "#f29180",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
      { name: "% Laundry",  nominal: Number(this.state.expenseTotal[6]), color: "#ef6678",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
      { name: "% Liburan",  nominal: Number(this.state.expenseTotal[7]), color: "#ae4264",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
      { name: "% Amal",  nominal: Number(this.state.expenseTotal[8]), color: "#7d2c4d",
        legendFontColor: "#7F7F7F", legendFontSize: 12
      },
    ];
      const chartConfig = {
        backgroundColor: '#1cc910',
        backgroundGradientFromOpacity: 0,
        backgroundGradientFrom: '#eff3ff',
        backgroundGradientTo: '#efefef',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
          borderRadius: 16,
        },
      };
    return (
      <View style={styles.container}>
        <Kepala/>
        <View style={global.container}>
          <View style={styles.box}> 
              <PieChart  data={data} width={lebar} height={200}  chartConfig={chartConfig} accessor="nominal"  paddingLeft="10"  absolute/>
          </View>
          <View style={styles.box}> 
              <DataTable style={styles.tabel}>
                    <FlatList data={deskripsi}  renderItem={({item}) =>(
                        <DataTable.Row style={styles.row}>
                          <DataTable.Cell style={styles.cell}>{item.key}</DataTable.Cell>
                          <DataTable.Cell style={styles.cell} numeric>{item.value} Rupiah</DataTable.Cell>
                        </DataTable.Row>
                    )}/>
                </DataTable>
          </View>
        </View>
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content:{
    flexDirection: "column",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  box:{
    paddingVertical: 3,
  },
  row:{
    height: 30,
    borderBottomWidth: 0,
    paddingVertical:0,
  },
  cell:{
    fontSize: 2,
    paddingVertical:0,
  }
});
export default Sum