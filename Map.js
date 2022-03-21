import * as React from "react";
import { useState, useRef, useEffect} from "react";
import MapView, { Marker, Callout, Circle, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Pressable, Text, View, Dimensions, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate } from "./coordinateSlice";
import { selectData } from "./dataSlice";
import { swap, swapRad } from "./coordinateSlice";
import { getData, storeData } from "./dataFunction";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Slider } from "@miblanchard/react-native-slider";

export default function Map() {
  const map = useRef(null);
  const coordinate = useSelector(selectCoordinate);
  const locBase = useSelector(selectData);
  const dispatch = useDispatch();
  const [radius, setRadius] = useState(); //состояние видимости формуляра самолета
  const [radiusArray, setRadiusArray] = useState(0); //состояние текущих координат карты (изменяются при перемещении)

  let granica1 = +coordinate.lat + coordinate.lonPred;
  let granica2 = +coordinate.lon - coordinate.latPred;
  let granica3 = +coordinate.lat - coordinate.lonPred;
  let granica4 = +coordinate.lon + coordinate.latPred;

  const onLocationPress = async () => {
    try {
      const camera = await map.current.getCamera();
      return [camera.center.latitude, camera.center.longitude];
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    let rad = [];
            for (let i = 0; i < coordinate.rad; i += 10) {
              rad.push(i + 10);
            }
            setRadiusArray(rad);
  },[])

  return (
    <View style={styles.container}>
      <MapView
        ref={(current) => (map.current = current)}
        onLayout={() => {
          map.current.animateCamera({
            center: {
              latitude: +coordinate.lat,
              longitude: +coordinate.lon,
            },
          });
        }}
        initialRegion={{
          latitude: +coordinate.lat,
          longitude: +coordinate.lon,
          latitudeDelta: 1.2722,
          longitudeDelta: 0.9721,
        }}
        style={styles.map}
        provider={ PROVIDER_GOOGLE }
        mapType={"standard"}
      >
        <Marker
          pinColor="black"
          key={1}
          coordinate={{ latitude: granica1, longitude: granica2 }}
        ><Callout tooltip={true}><Text>1</Text></Callout></Marker>
        <Marker
          pinColor="black"
          key={2}
          coordinate={{ latitude: granica1, longitude: granica4 }}
        ><Callout tooltip={true}><Text>2</Text></Callout></Marker>
        <Marker
          pinColor="black"
          key={3}
          coordinate={{ latitude: granica3, longitude: granica2 }}
        ><Callout tooltip={true}><Text>3</Text></Callout></Marker>
        <Marker
          pinColor="black"
          key={4}
          coordinate={{ latitude: granica3, longitude: granica4 }}
        ><Callout tooltip={true}><Text>4</Text></Callout></Marker>
        {radiusArray[0] ? radiusArray.map((item)=>{return <Circle key={item} center={{latitude: +coordinate.lat, longitude: +coordinate.lon}} radius={item*1000}/>}) : null}
        {radiusArray[0] ? radiusArray.map((item)=>{if(+item%50==0){ return <Circle strokeWidth={2} key={item} center={{latitude: +coordinate.lat, longitude: +coordinate.lon}} radius={item*1000}/>}}) : null}
        {radiusArray[0] ? radiusArray.map((item)=>{if(+item%100==0){ return <Circle strokeWidth={3} key={item} center={{latitude: +coordinate.lat, longitude: +coordinate.lon}} radius={item*1000}/>}}) : null}
        {locBase.value[0] !== undefined
          ? locBase.value.map((item) => (
              <Marker
                key={item[0]}
                coordinate={{ latitude: item[2], longitude: item[3] }}
              >
                {/* формуляр самолета */}
                <Callout tooltip={true}>
                    <View style={styles.marker}>
                      <Text>{item[17] || "Без названия"}</Text>
                      <Text>Азимут: {Math.round(item[20])}</Text>
                      <Text>Дальность: {Math.round(item[19] / 100) / 10}</Text>
                      <Text>Высота: {Math.round(item[5] / 0.33) / 10}</Text>
                      <Text>Скорость: {Math.round(item[6] * 1.87)}</Text>
                      <Text>Курс: {item[4]}</Text>
                    </View>
                </Callout>
              </Marker>
            ))
          : null}
      </MapView>
      <View style={styles.coordinate}>
        <View>
          {/* кнопка поиска в секторе */}
          <Pressable
            style={styles.button}
            onPress={() => {
              console.log(coordinate)
              onLocationPress()
                .then((res) => {
                  storeData("Координаты с карты", +res[0], +res[1], 300);
                })
                .then((res) => {
                  getData().then((result) => {
                    dispatch(
                      swap({ lat: result[1], lon: result[2], rad: result[3] })
                    );
                  });
                });
            }}
          >
            <Ionicons name={"search"} size={30} color={"tomato"} />
          </Pressable>
          {/* кнопка переноса камеры в введенные координаты */}
          <Pressable
            style={styles.button}
            onPress={() => {
              map.current.animateCamera({
                center: {
                  latitude: +coordinate.lat,
                  longitude: +coordinate.lon,
                },
              });
            }}
          >
            <Ionicons name={"locate"} size={30} color={"tomato"} />
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              console.log(window)
            }}
          >
            <Ionicons name={"locate"} size={30} color={"tomato"} />
          </Pressable>
        </View>
      </View>
      {coordinate.rad !==0 ? 
      <View style={styles.slider}>
        <Slider
          value={radius ? radius : coordinate.rad}
          onValueChange={(value) => {
            let rad = [];
            for (let i = 0; i < value; i += 10) {
              rad.push(i + 10);
            }
            setRadiusArray(rad);
            setRadius(value);
          }}
          onSlidingComplete={(value)=>{
            dispatch(
              swapRad({ rad: value[0]} )
              )
          }
            }
          maximumValue={500}
          step={10}
        />
        <Text>Value: {radius ? radius : coordinate.rad}</Text>
      </View> : null}
    </View>
  );
}

//стили

const styles = StyleSheet.create({
  marker: {
    // position: "absolute",
    // width: 160,
    // height:100,
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
    right: 10,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: "gray",
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
  slider: {
    flex: 1,
    marginLeft: 10,
    marginRight: 10,
    alignItems: "stretch",
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
    right: 50,
    width: 250,
  },
  input: {
    backgroundColor: "gray"
  }
});
