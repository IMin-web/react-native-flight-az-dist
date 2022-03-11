import { View, StyleSheet, Text} from 'react-native';
import React, {useState, useEffect } from "react";
import locate from "./locate";
import Dalnost from "./Dalnost";
import Azimut from "./Azimut";
import { Table, Row} from 'react-native-table-component';


export default function HomeScreen({navigation}) {
    const [locBase, setLocBase] = useState([]);
    const [lat, setLat] = useState(61.28527651284786);
    const [lon, setLon] = useState(63.17582723137468);
    const data ={
        tableHead: ['Азимут', 'Дальность', 'Высота', 'Скорость', 'Курс']
    }

    useEffect(() => {
      let result;
      locate(lat, lon)
        .then((res) => (result = res))
        .then((res) => result.map((item) => item.push(Dalnost(item, lat, lon))))
        .then((res) => result.map((item) => item.push(Azimut(item, lat, lon))))
        .then((res) => setLocBase(result));
    });
    

    return (
        <View>
        {locBase.map((item)=>(
            <View>
                <Text style={styles.tableName}>{item[17] || "Без названия"}</Text>
        <View style={styles.container}>
            <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
          <Row data={data.tableHead} style={styles.head} textStyle={styles.text}/>
          <Row style={styles.data} data={[`${Math.round(item[20])}`,`${Math.round(item[19] / 100) / 10}`,`${Math.round(item[5] / 0.33) / 10}`, `${Math.round(item[6] * 1.87)}`, `${item[4]}` ]} textStyle={styles.text}/>
        </Table>
      </View> 
      </View>
      ))}
    </View>
    );
  };
  const styles=StyleSheet.create({
      tableName: {color: 'tomato', textAlign: 'center', fontWeight: 'bold', fontSize: 24},
    container: { flex: 3, marginBottom: 90, backgroundColor: '#fff'},
  head: { height: 40, backgroundColor: '#f1f8ff' },
  text: { margin: 2, textAlign:'center'},
  data: {height:50, backgroundColor:'#fff'}
})