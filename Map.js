import * as React from "react";
import { useState, useEffect, useRef } from "react";
import MapView, { Marker, Callout } from "react-native-maps";
import {
  StyleSheet,
  Pressable,
  Button,
  Text,
  View,
  Dimensions,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate } from "./coordinateSlice";
import { selectData } from "./dataSlice";
import { swap } from "./coordinateSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Map() {
  const map = useRef(null)
  const coordinate = useSelector(selectCoordinate);
  const locBase = useSelector(selectData);
  const dispatch = useDispatch();
  const [form, setForm] = useState(0);
  const [region, setRegion] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [latitude, setLatitude] = useState(0);
  
  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify([, region.latitude, region.longitude]);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
    }
  };
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@storage_Key");
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
    }
  };
//  getData().then((res) => return (res[1])});

  useEffect(()=>{
    console.log('first')
    getData().then((res) => {setLatitude(res[1]); setLongitude(res[2])})
  },[])

  return (
    <View style={styles.container}>
      <MapView
      ref={(current) => map.current = current}
      onLayout={() => {
          map.current.animateCamera({
            center:{
              latitude: latitude,
              longitude: longitude,
            },
              pitch: 70
          })
      }}
        initialRegion={{
          latitude: coordinate.lat,
          longitude: coordinate.lon,
          latitudeDelta: 1.2722,
          longitudeDelta: 0.9721,
        }}
        style={styles.map}
        onRegionChangeComplete={(region) => {
          setRegion(region);
        }}
        mapType={"standard"}
      >
        {locBase.value[0] !== undefined
          ? locBase.value.map((item) => (
              <Marker
                key={item[0]}
                coordinate={{ latitude: item[2], longitude: item[3] }}
                onPress={() => {
                  form !== item[0] ? setForm(item[0]) : setForm(0);
                }}
              >
                <Callout tooltip={true}>
                  {form === item[0] ? (
                    <View style={styles.marker}>
                      <Text >{item[17] || "Без названия"}</Text>
                      <Text>Азимут: {Math.round(item[20])}</Text>
                      <Text>Дальность: {Math.round(item[19] / 100) / 10}</Text>
                      <Text>Высота: {Math.round(item[5] / 0.33) / 10}</Text>
                      <Text>Скорость: {Math.round(item[6] * 1.87)}</Text>
                      <Text>Курс: {item[4]}</Text>
                    </View>
                  ) : null}
                </Callout>
              </Marker>
            ))
          : null}
      </MapView>
      <View style={styles.coordinate}>
        <View>
          <Text>
            {coordinate.lat}
          </Text>
          <Text>{coordinate.lon}</Text>
        </View>
        <View>
          <Pressable
            style={styles.button}
            onPress={() => {
              storeData().then(()=>{dispatch(swap({ lat: region.latitude, lon: region.longitude }))});
            }}
          >
            <Text style={styles.text}>поиск</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: "absolute",
    width: 140,
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
    height: Dimensions.get("window").height,
  },
  coordinate: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "black",
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
