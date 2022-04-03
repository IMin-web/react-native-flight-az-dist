import React, { useState, useRef, useEffect } from "react";
import MapView, { Circle, Marker, Callout } from "react-native-maps";
import {
  Pressable,
  Text,
  View,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate, swap, swapRad } from "./store/coordinateSlice";
import { selectData } from "./store/dataSlice";
import { getData, storeData } from "./localStorage";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Slider } from "@miblanchard/react-native-slider";
import MarkerMap from "./MarkerMap";
import { mapStyle } from "./styles";

export default function Map({ navigation }) {
  const map = useRef(null);
  const coordinate = useSelector(selectCoordinate);
  const locBase = useSelector(selectData);
  const dispatch = useDispatch();
  const [radius, setRadius] = useState(300); //состояние видимости формуляра самолета
  const [radiusArray, setRadiusArray] = useState(0); //состояние текущих координат карты (изменяются при перемещении)
  const [mapType, setMapType] = useState("standard"); //состояние текущих координат карты (изменяются при перемещении)
  const [modalVisible, setModalVisible] = useState(false);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Pressable
          style={{ marginRight: 10 }}
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Ionicons name={"help-circle-outline"} size={40} color={"#2196F3"} />
        </Pressable>
      ),
    });
  }, [navigation]);

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
        onMapReady={()=>{
          let rad = [];
          for (let i = 0; i < coordinate.rad; i += 10) {
            rad.push(i + 10);
          }
          setRadiusArray(rad);}}
      >
        {/* <Marker
          pinColor="black"
          key={1}
          coordinate={{ latitude: granica1, longitude: granica2 }}
        >
          <Callout>
            <Text>
              {granica1},{granica2}
            </Text>
          </Callout>
        </Marker> 
        <Marker
          pinColor="black"
          key={4}
          coordinate={{ latitude: granica3, longitude: granica4 }}
        >
          <Callout>
            <Text>
              {granica3},{granica4}
            </Text>
          </Callout>
        </Marker>*/}
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
                  storeData("Координаты с карты", +res[0], +res[1], radius);
                })
                .then((res) => {
                  getData("Координаты с карты").then((result) => {
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
            <Ionicons name={"search"} size={30} color={"white"} />
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
            <Ionicons name={"locate"} size={30} color={"white"} />
          </Pressable>
          <Pressable
            style={{
              elevation: 3,
              backgroundColor: "#2196F3",
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
              setRadius(value[0]);
            }}
            onSlidingComplete={(value) => {
              getData("Координаты с карты")
              .then((res)=>{
                storeData("Координаты с карты", res[1], res[2], radius);
            })
              dispatch(swapRad({ rad: value[0] }));
            }}
            maximumValue={500}
            step={10}
          />
          <Text
            style={{
              backgroundColor: "#2196F3",
              textAlign: "center",
              paddingBottom: 5,
              paddingTop: 5,
              fontSize: 16,
              color: "white",
            }}
          >
            Радиус поиска: {radius ? radius : coordinate.rad} км.
          </Text>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <View style={styles.modalSection}>
                  <Image
                    source={require(`./assets/standard.png`)}
                    style={mapStyle.mapMenu}
                  />
                  <Text style={styles.textStyle}>Стандартный вид карты</Text>
                </View>
                <View style={styles.modalSection}>
                  <Image
                    source={require(`./assets/satellite.png`)}
                    style={mapStyle.mapMenu}
                  />
                  <Text style={styles.textStyle}>Вид карты со спутника</Text>
                </View>
                <View style={styles.modalSection}>
                  <Ionicons name={"search"} size={30} color={"black"} />
                  <Text style={styles.textStyle}>
                    Поиск самолетов в текущей зоне
                  </Text>
                </View>
                <View style={styles.modalSection}>
                  <Ionicons name={"locate"} size={30} color={"black"} />
                  <Text style={styles.textStyle}>
                    Перенос камеры к точке поиска
                  </Text>
                </View>
                <View style={styles.modalSection}>
                  <View style={{ width: 50 }}>
                    <Slider value={20} maximumValue={50} step={10} />
                  </View>
                  <Text style={styles.textStyle}>Радиус поиска</Text>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
                >
                  <Text style={{ color: "white", fontSize: 16 }}>
                    Скрыть окно
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalSection: {
    // flex:1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    alignItems: "center",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: { fontSize: 16 },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
