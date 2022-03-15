import React, {useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import TableComponent from "./Table";
import Map from "./Map";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import Settings from "./Settings";
import locate from "./locate";
import Dalnost from "./Dalnost";
import Azimut from "./Azimut";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate } from "./coordinateSlice";
import { set } from "./dataSlice"
import { selectData } from "./dataSlice";
import * as Location from 'expo-location';
import { swap } from "./coordinateSlice";
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const Tab = createBottomTabNavigator();
    const coordinate = useSelector(selectCoordinate); 
    const dispatch = useDispatch();
    const locBase = useSelector(selectData);
    // const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
  
  const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@storage_Key')
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      } catch(e) {
        // error reading value
      }
    }

    useEffect(()=>{
      getData().then((res)=>{dispatch(swap({name:res[0], lat: res[1], lon: res[2] }))});
    },[])
  
    // useEffect(() => {
    //   (async () => {
    //     let { status } = await Location.requestForegroundPermissionsAsync();
    //     if (status !== 'granted') {
    //       setErrorMsg('Permission to access location was denied');
    //       return;
    //     }
    //     let location = await Location.getCurrentPositionAsync({});
    //     dispatch(swap({ lat: location.coords.latitude, lon: location.coords.longitude }))
    //   })();
    // }, []);
 
    useEffect(() => {
      let result;
      locate(coordinate.lat, coordinate.lon)
        .then((res) => (result = res))
        .then((res) => result.map((item) => item.push(Dalnost(item, coordinate.lat, coordinate.lon))))
        .then((res) => result.map((item) => item.push(Azimut(item, coordinate.lat, coordinate.lon))))
        .then((res) => dispatch(set(result)));
    },locBase[0]);
    return(
        <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === "Таблица") {
                iconName = focused ? "ios-list" : "ios-list-sharp";
              } else if (route.name === "Карта") {
                iconName = focused ? "map-sharp" : "map";
              } else if (route.name === "Настройки") {
                iconName = focused ? "ios-settings-sharp" : "ios-settings";
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "tomato",
            tabBarInactiveTintColor: "gray",
          })}
        >      
          <Tab.Screen name="Карта" component={Map} />
          <Tab.Screen name="Таблица" component={TableComponent}/>
          <Tab.Screen name="Настройки" component={Settings} />
        </Tab.Navigator>
      </NavigationContainer>
    )
}