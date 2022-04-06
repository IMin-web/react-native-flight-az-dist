import { Text, TextInput, View, StyleSheet, ScrollView,Pressable, SafeAreaView, StatusBar } from "react-native";
import { settingsStyle } from "../styles";
import { selectCoordinate } from "../store/coordinateSlice";
import { useSelector } from "react-redux";
import { selectAir, delAir } from "../store/airSlice"
import React, {useEffect, useState} from "react";
import { swap } from "../store/coordinateSlice";
import { getData, removeValue, storeData, getMultiple} from "../localStorage";
import { useDispatch } from "react-redux";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setAir} from "../store/airSlice"
import { Dimensions } from "react-native";


export default function CurrentProfile() {
  const airData = useSelector(selectAir);
  const [airState, setAirState] = useState();
  const coordinate = useSelector(selectCoordinate); 
  const dispatch = useDispatch();
  const [name, onChangeName] = useState();

  useEffect(() => {
     setAirState(airData)},[airData])
  return (
    <View>
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.header}>Текущие координаты</Text>
      <View style={[settingsStyle.inputContainer, {justifyContent:"center"}]}>
        <TextInput placeholder="Введите название профиля" value={name} style={[settingsStyle.input,{width:0.9*Dimensions.get("window").width,}]}
        onChangeText={onChangeName}></TextInput>
      </View>
      <View style={settingsStyle.inputContainer}>
        <Text style={settingsStyle.text}>Широта</Text>
        <Text style={settingsStyle.text}>{coordinate.lat}</Text>
      </View>
      <View style={settingsStyle.inputContainer}>
        <Text style={settingsStyle.text}>Долгота</Text>
        <Text style={settingsStyle.text}>{coordinate.lon}</Text>
      </View>
      <View style={settingsStyle.inputContainer}>
        <Text style={settingsStyle.text}>Радиус</Text>
        <Text style={settingsStyle.text}>{coordinate.rad}</Text>
      </View>
      <Pressable onPress={async ()=>{
            alert(`Профиль ${name} успешно создан!`);
            storeData(name, coordinate.lat, coordinate.lon, coordinate.rad)
            .then(()=>{
            getData(name).then((res) => {
              dispatch(swap({ name: res[0], lat: res[1], lon: res[2], rad: res[3] }))
              // dispatch(setAir(res))
            })
            getMultiple().then((res)=>{
              dispatch(setAir(res))})
          });
            }}>
          <View style={settingsStyle.button}>
            <Text style={[settingsStyle.text, {color:'white'}]}>Сохранить профиль</Text></View>
          </Pressable>
    </View>
    <ScrollView>
      <SafeAreaView>
      {airState ? airState.map((item)=>{
        return (<Pressable
        key={item[0]}
        style={coordinate.name === item[0] ? styles.select : styles.notSelect}
          onPress={()=>{
          getData(item[0])
          .then((res)=>{dispatch(swap({ name: res[0], lat: res[1], lon: res[2], rad: res[3] }))}) }     
      }>
        <View>
        <Text style={styles.title}>{item[0]}</Text>
          <Text style={{color:'white'}}>Долгота: {item[1][1]}</Text>
          <Text style={{color:'white'}}>Широта: {item[1][2]}</Text>
        </View>
          <Pressable onPress={()=>{
            removeValue(item[0])
              dispatch(delAir(item[0]))
            }}>
          <Ionicons name={"close"} size={30} color={"black"} />
          </Pressable>
          </Pressable>)
      }) : null}
    </SafeAreaView> 
    </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  select: {
    backgroundColor: 'tomato',
    height: 100,
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notSelect: {
    backgroundColor: '#2196F3',
    height: 100,
    justifyContent: 'space-between',
    marginVertical: 8,
    marginHorizontal: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 32,
  },
});
