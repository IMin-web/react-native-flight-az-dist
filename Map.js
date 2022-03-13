import * as React from "react";
import { useState} from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Pressable, Text, View, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate } from "./coordinateSlice";
import { selectData } from "./dataSlice";
import { swap } from "./coordinateSlice"

export default function Map() {
  const coordinate = useSelector(selectCoordinate);
  const locBase = useSelector(selectData);
  const dispatch = useDispatch();
  const [form, setForm] = useState(0);
  function onRegionChange(region) {
    dispatch(swap({lat: region.latitude, lon:region.longitude}))
  }
  return (
    <View style={styles.container}>
      <View
        style={styles.coordinate}>
        <Text style={{ marginRight: 10 }}>{coordinate.lat}</Text>
        <Text>{coordinate.lon}</Text>
      </View>
      <MapView
        initialRegion={{
          latitude: 61.315993261812864,
          longitude: 63.33314578699291,
          latitudeDelta: 1.2722,
          longitudeDelta: 0.9721,
        }}
        style={styles.map}
        onRegionChange={onRegionChange}
      >
        {locBase.value[0] !== undefined ? locBase.value.map((item) => (
          <Marker
            key={item[0]}
            coordinate={{ latitude: item[2], longitude: item[3] }}
          >
            <Text>{item[17] || "Без названия"}</Text>
            <Pressable
              onPress={() => {
                form === 0 ? setForm(item[0]) : setForm(0);
              }}
              style={{ height: 20, width: 20, backgroundColor: "tomato" }}
            />
            {form === item[0] ? (
              <Pressable
                onPress={() => {
                  form === 0 ? setForm(item[0]) : setForm(0);
                }}
              >
                <View style={styles.marker}>
                  <Text>Азимут: {Math.round(item[20])}</Text>
                  <Text>Дальность: {Math.round(item[19] / 100) / 10}</Text>
                  <Text>Высота: {Math.round(item[5] / 0.33) / 10}</Text>
                  <Text>Скорость: {Math.round(item[6] * 1.87)}</Text>
                  <Text>Курс: {item[4]}</Text>
                </View>
              </Pressable>
            ) : null}
          </Marker>
        )): null} 
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: "absolute",
    width: 120,
    backgroundColor: "#fff",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: 0.78 * Dimensions.get("window").height,
  },
  coordinate: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",}
});
