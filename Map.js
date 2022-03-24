import React, { useState, useRef, useEffect } from "react";
import MapView, { Circle } from "react-native-maps";
import { Pressable, Text, View, Image, Animated } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate, swap, swapRad } from "./store/coordinateSlice";
import { selectData } from "./store/dataSlice";
import { getData, storeData } from "./localStorage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Slider } from "@miblanchard/react-native-slider";
import MarkerMap from "./MarkerMap";
import { mapStyle } from "./styles";

export default function Map() {
  const map = useRef(null);
  const coordinate = useSelector(selectCoordinate);
  const locBase = useSelector(selectData);
  const dispatch = useDispatch();
  const [radius, setRadius] = useState(); //состояние видимости формуляра самолета
  const [radiusArray, setRadiusArray] = useState(0); //состояние текущих координат карты (изменяются при перемещении)
  const [mapType, setMapType] = useState("standard"); //состояние текущих координат карты (изменяются при перемещении)

  // let granica1 = +coordinate.lat + coordinate.lonPred;
  // let granica2 = +coordinate.lon - coordinate.latPred;
  // let granica3 = +coordinate.lat - coordinate.lonPred;
  // let granica4 = +coordinate.lon + coordinate.latPred;
  // const mapTypeArray = ['standard', 'satellite', 'hybrid', 'terrain']

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
  }, []);

  return (
    <View style={mapStyle.container}>
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
        style={mapStyle.map}
        // provider={ PROVIDER_GOOGLE }
        mapType={mapType}
      >
        {/* <Marker
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
        ><Callout tooltip={true}><Text>4</Text></Callout></Marker> */}
        {radiusArray[0]
          ? radiusArray.map((item) => {
              return (
                <Circle
                  key={item}
                  center={{
                    latitude: +coordinate.lat,
                    longitude: +coordinate.lon,
                  }}
                  radius={item * 1000}
                />
              );
            })
          : null}
        {radiusArray[0]
          ? radiusArray.map((item) => {
              if (+item % 50 == 0) {
                return (
                  <Circle
                    strokeWidth={2}
                    key={item}
                    center={{
                      latitude: +coordinate.lat,
                      longitude: +coordinate.lon,
                    }}
                    radius={item * 1000}
                  />
                );
              }
            })
          : null}
        {radiusArray[0]
          ? radiusArray.map((item) => {
              if (+item % 100 == 0) {
                return (
                  <Circle
                    strokeWidth={3}
                    key={item}
                    center={{
                      latitude: +coordinate.lat,
                      longitude: +coordinate.lon,
                    }}
                    radius={item * 1000}
                  />
                );
              }
            })
          : null}
        {locBase.value[0] !== undefined
          ? locBase.value.map((item) => <MarkerMap key={item[0]} data={item} />)
          : null}
      </MapView>
      <View style={mapStyle.coordinate}>
        <View>
          {/* кнопка поиска в секторе */}
          <Pressable
            style={mapStyle.button}
            onPress={() => {
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
                })
                .catch((err) => {
                  Alert.error(err);
                });
            }}
          >
            <Ionicons name={"search"} size={30} color={"black"} />
          </Pressable>
          {/* кнопка переноса камеры в введенные координаты */}
          <Pressable
            style={mapStyle.button}
            onPress={() => {
              map.current.animateCamera({
                center: {
                  latitude: +coordinate.lat,
                  longitude: +coordinate.lon,
                },
              });
            }}
          >
            <Ionicons name={"locate"} size={30} color={"black"} />
          </Pressable>
          <Pressable
            style={{
              elevation: 3,
              backgroundColor: "#C5D6FA",
              paddingHorizontal: 2.5,
              paddingVertical: 2.5,
              borderRadius: 4,
            }}
            onPress={() => {
              mapType === "standard"
                ? setMapType("satellite")
                : setMapType("standard");
            }}
          >
            {mapType === "standard" ? (
              <Image
                source={require(`./assets/standard.png`)}
                style={mapStyle.mapMenu}
              />
            ) : (
              <Image
                source={require(`./assets/satellite.png`)}
                style={mapStyle.mapMenu}
              />
            )}
          </Pressable>
        </View>
      </View>
      {coordinate.rad !== 0 ? (
        <View style={mapStyle.slider}>
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
            onSlidingComplete={(value) => {
              dispatch(swapRad({ rad: value[0] }));
            }}
            maximumValue={500}
            step={10}
          />
          <Text
            style={{
              backgroundColor: "#C5D6FA",
              textAlign: "center",
              paddingBottom: 5,
              paddingTop: 5,
              fontSize: 16,
            }}
          >
            Радиус поиска: {radius ? radius : coordinate.rad} км.
          </Text>
        </View>
      ) : null}
    </View>
  );
}
