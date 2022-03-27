import { Pressable, Text, View, TextInput } from "react-native";
import { settingsStyle } from "../styles";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getData, storeData, getMultiple} from "../localStorage";
import { swap } from "../store/coordinateSlice";
import { setAir} from "../store/airSlice"

export default function CreateProfile() {
  const [name, setName] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [rad, setRad] = useState(0);
  const dispatch = useDispatch();

  function clickHandler() {
    alert(`Профиль ${name} успешно создан!`);
    storeData(name, lat, lon, rad)
    .then(()=>{
    getData(name).then((res) => {
      dispatch(swap({ name: res[0], lat: res[1], lon: res[2], rad: res[3] }))
      // dispatch(setAir(res))
    })
    getMultiple().then((res)=>{
      dispatch(setAir(res))})
  });
  }

  return (
    <View style={settingsStyle.container}>
      <Text style={settingsStyle.header}>Создание профиля с координатами</Text>
      <View style={{ flexDirection: "column" }}>
        <View style={settingsStyle.inputContainer}>
          <Text style={settingsStyle.text}>Название</Text>
          <TextInput
            // autoFocus={true}
            style={settingsStyle.input}
            placeholder="Введите название профиля"
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>
        <View style={settingsStyle.inputContainer}>
          <Text style={settingsStyle.text}>Широта</Text>
          <TextInput
            style={settingsStyle.input}
            placeholder="Введите нужную широту"
            keyboardType="numeric"
            onChangeText={(text) => {
              setLat(+text);
            }}
          />
        </View>
        <View style={settingsStyle.inputContainer}>
          <Text style={settingsStyle.text}>Долгота</Text>
          <TextInput
            style={settingsStyle.input}
            placeholder="Введите нужную долготу"
            keyboardType="numeric"
            onChangeText={(text) => {
              setLon(+text);
            }}
          />
        </View>
        <View style={settingsStyle.inputContainer}>
          <Text style={settingsStyle.text}>Радиус</Text>
          <TextInput
            style={settingsStyle.input}
            placeholder="Введите нужный радиус"
            keyboardType="numeric"
            onChangeText={(text) => {
              setRad(+text);
            }}
          />
        </View>
      </View>
      <Pressable style={settingsStyle.button} onPress={() => clickHandler()}>
        <Text style={settingsStyle.textButton}>Создать</Text>
      </Pressable>
    </View>
  );
}
