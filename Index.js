import React, { useEffect } from "react";
import { Alert, DevSettings} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate, fetchCoords } from "./store/coordinateSlice";
import { set, selectData } from "./store/dataSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import { setAir } from "./store/airSlice";
import TableComponent from "./TableComponent";
import Map from "./Map";
import Settings from "./Settings";
import locate from "./locate";
import Dalnost from "./Dalnost";
import Azimut from "./Azimut";
import { getMultiple } from "./localStorage";

export default function Index() {
  const Tab = createBottomTabNavigator();
  const coordinate = useSelector(selectCoordinate);
  const dispatch = useDispatch();
  const locBase = useSelector(selectData);

  useEffect(() => {
    getMultiple().then((res) => {
      dispatch(setAir(res));
    });
  }, []);

  //extraReducer запроса и вывода координат
  useEffect(() => {
    dispatch(fetchCoords());
  }, [dispatch]);

  useEffect(() => {
    let result;
    //запрос данных с FlightRadar24 по введенным координатам
    locate(
      coordinate.lat,
      coordinate.lon,
      coordinate.latPred,
      coordinate.lonPred
    )
      .then((res) => {if(res[0]){
        result = res}
      else{
        error}})
      //добавление в массив результатов дальности до самолета
      .then((res) =>
        result.map((item) => {
          item.push(Dalnost(item, coordinate.lat, coordinate.lon));
          item.push(Azimut(item, coordinate.lat, coordinate.lon));
        })
      )
      //добавление в массив результатов азимута самолета
      .then((res) => dispatch(set(result)))
      .catch(() => {
        dispatch(set(0))
      });
  }, locBase[0]);

  return (
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
          tabBarActiveTintColor: "#2196F3",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen
          name="Карта"
          component={Map}
        />
        <Tab.Screen name="Таблица" component={TableComponent} />
        <Tab.Screen name="Настройки" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
