import * as React from 'react';
import { useState, useEffect } from "react";
import MapView, {Marker} from 'react-native-maps';
import { StyleSheet, Pressable, Text, View, Dimensions } from 'react-native';
import locate from "./locate";
import Dalnost from "./Dalnost";
import Azimut from "./Azimut";

export default function Map() {
  const [locBase, setLocBase] = useState([]);
  const [lat, setLat] = useState(61.28527651284786);
  const [lon, setLon] = useState(63.17582723137468);
  const [form, setForm] = useState(0);

  useEffect(() => {
    let result;
    locate(lat, lon)
      .then((res) => (result = res))
      .then((res) => result.map((item) => item.push(Dalnost(item, lat, lon))))
      .then((res) => result.map((item) => item.push(Azimut(item, lat, lon))))
      .then((res) => setLocBase(result));
  });
  return (
    <View style={styles.container}>
      <MapView initialRegion={{
      latitude: 61.315993261812864,
      longitude: 63.33314578699291,
      latitudeDelta: 1.2722,
      longitudeDelta: 0.9721,
    }} style={styles.map} >
      {locBase.map((item)=>(<Marker
      key={item[0]}
      coordinate={{ latitude : item[2] , longitude : item[3] }}
    >
      <Text>{item[17] || "Без названия"}</Text>
      <Pressable onPress={()=>{form === 0 ? setForm(item[0]) : setForm(0)}} style={{height: 20, width:20, backgroundColor:'tomato'}}/>
      {form === item[0] ? 
      <Pressable onPress={()=>{form === 0 ? setForm(item[0]) : setForm(0)}}>
      <View style={styles.marker}>
      <Text>Азимут: {Math.round(item[20])}</Text>
                    <Text>Дальность: {Math.round(item[19] / 100) / 10}</Text>
                    <Text>Высота: {Math.round(item[5] / 0.33) / 10}</Text>
                    <Text>Скорость: {Math.round(item[6] * 1.87)}</Text>
                    <Text>Курс: {item[4]}</Text>

      </View> 
      </Pressable>
      : null}
      </Marker>))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  marker:{
    position: 'absolute',
    // height:20,
    width:120,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});