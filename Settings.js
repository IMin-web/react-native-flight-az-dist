import React, { useState } from "react";
import {
  Pressable,
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  ScrollView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate } from "./coordinateSlice";
import { selectData } from "./dataSlice";
import { swap } from "./coordinateSlice";
import { set } from "./dataSlice";
import { Picker } from "@react-native-picker/picker";
import {getData, storeData} from './dataFunction'

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
      <View style={styles.container}>
        <Text style={styles.header}>Текущий профиль</Text>
        <View style={styles.inputContainer}>
            <Text style={styles.text}>Название</Text>
        <Text style={styles.text}>{coordinate.name}</Text>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.text}>Широта</Text>
        <Text style={styles.text}>{coordinate.lat}</Text>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.text}>Долгота</Text>
        <Text style={styles.text}>{coordinate.lon}</Text>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.text}>Радиус</Text>
        <Text style={styles.text}>{coordinate.rad}</Text>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.text}>Предел широты</Text>
        <Text style={styles.text}>{coordinate.latPred}</Text>
        </View>
        <View style={styles.inputContainer}>
            <Text style={styles.text}>Предел долготы</Text>
        <Text style={styles.text}>{coordinate.lonPred}</Text>
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
      <View style={styles.container}>
        <Text style={styles.header}>Создание профиля с координатами</Text>
        <View style={{ flexDirection: "column" }}>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Название</Text>
            <TextInput
            // autoFocus={true}
              style={styles.input}
              placeholder="Введите название профиля"
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Широта</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите нужную широту"
              keyboardType="numeric"
              onChangeText={(text) => {
                setLat(+text);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Долгота</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите нужную долготу"
              keyboardType="numeric"
              onChangeText={(text) => {
                setLon(+text);
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.text}>Радиус</Text>
            <TextInput
              style={styles.input}
              placeholder="Введите нужный радиус"
              keyboardType="numeric"
              onChangeText={(text) => {
                setRad(+text);
              }}
            />
          </View>
        </View>
        <Pressable style={styles.button} onPress={() => clickHandler()}>
          <Text style={styles.textButton}>Ввод</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: "gray",
    marginBottom: 40,
  },
  inputContainer: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingLeft: 10,
    paddingRight: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: 0.3 * Dimensions.get("window").height,
  },
  header: {
    fontSize: 36,
    paddingBottom: 10,
    paddingTop: 10,
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    marginTop: 20,
  },
  text: {
    textAlign: "center",
    justifyContent: "space-around",
    paddingTop: 10,
    paddingBottom: 10,
    // backgroundColor: "tomato",
    fontSize: 24,
  },
  textButton: {
    textAlign: "center",
    paddingTop: 10,
    paddingBottom: 10,
    // backgroundColor: "tomato",
    fontSize: 24,
    color: "white",
  },
});
