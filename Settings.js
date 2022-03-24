import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  TextInput,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate, swap } from "./store/coordinateSlice";
import { selectData } from "./store/dataSlice";
import { set } from "./store/dataSlice";
import { Picker } from "@react-native-picker/picker";
import {getData, storeData} from './localStorage'
import {settingsStyle} from "./styles";


export default function App() {
  const [name, setName] = useState("");
  const [lat, setLat] = useState(0);
  const [lon, setLon] = useState(0);
  const [rad, setRad] = useState(0);
  const coordinate = useSelector(selectCoordinate);
  const dispatch = useDispatch();

  function clickHandler() {
    alert(`Профиль ${name} успешно создан!`)
    storeData(name, lat, lon, rad);
    getData().then((res) => {
      dispatch(swap({ name: res[0], lat: res[1], lon: res[2], rad:res[3] }));
    });
  }

  return (
    <ScrollView>
      <View style={settingsStyle.container}>
        <Text style={settingsStyle.header}>Текущий профиль</Text>
        <View style={settingsStyle.inputContainer}>
            <Text style={settingsStyle.text}>Название</Text>
        <Text style={settingsStyle.text}>{coordinate.name}</Text>
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
        <View style={settingsStyle.inputContainer}>
            <Text style={settingsStyle.text}>Предел широты</Text>
        <Text style={settingsStyle.text}>{coordinate.latPred}</Text>
        </View>
        <View style={settingsStyle.inputContainer}>
            <Text style={settingsStyle.text}>Предел долготы</Text>
        <Text style={settingsStyle.text}>{coordinate.lonPred}</Text>
        </View>
        {/* <Picker 
  selectedValue={selectedProfile}
  onValueChange={(itemValue, itemIndex) =>
    setSelectedProfile(itemValue)
  }>
  <Picker.Item label={coordinate.name} value={{lat: coordinate.lat, lon: coordinate.lon}} />
  <Picker.Item label="JavaScript" value="js" />
</Picker> */}
      </View>
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
          <Text style={settingsStyle.textButton}>Ввод</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}