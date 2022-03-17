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
import {getData, storeData} from './dataFunction'
import Ionicons from "react-native-vector-icons/Ionicons";


export default function Map() {
  const map = useRef(null)
  const coordinate = useSelector(selectCoordinate);
  const locBase = useSelector(selectData);
  const dispatch = useDispatch();
  const [form, setForm] = useState(0);
  const [region, setRegion] = useState(0);
  
  return (
    <View style={styles.container}>
      <MapView
      ref={(current) => map.current = current}
      onLayout={() => {
          map.current.animateCamera({
            center:{
              latitude: +coordinate.lat,
              longitude: +coordinate.lon,
            },
              pitch: 50
          })
      }}
        initialRegion={{
          latitude: +coordinate.lat,
          longitude: +coordinate.lon,
          latitudeDelta: 1.2722,
          longitudeDelta: 0.9721,
        }}
        
        style={styles.map}
        onRegionChange={(region) => {
          setRegion(region);
        }}
        mapType={"standard"}
        // onMarkerPress={(marker) => {console.log(marker);}}
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
          <Pressable
            style={styles.button}
            onPress={() => {
              storeData('Координаты с карты', region.latitude, region.longitude);
              getData().then((res)=>{dispatch(swap({ lat: region.latitude, lon: region.longitude }))});
            }}
          >
            <Ionicons name={'search'} size={30} color={'tomato'} />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={ () => 
              {map.current.animateCamera({
                center:{
                  latitude: +coordinate.lat,
                  longitude: +coordinate.lon,
                },
              })
          }}
          >
            <Ionicons name={'locate'} size={30} color={'tomato'} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  marker: {
    position: "absolute",
    width: 160,
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
    top: 10,
    right:10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    marginBottom:5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});
