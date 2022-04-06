import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSelector, useDispatch } from "react-redux";
import { selectCoordinate, fetchCoords } from "./store/coordinateSlice";
import { set } from "./store/dataSlice";
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
  const dispatch = useDispatch();
  const coordinate = useSelector(selectCoordinate);
  useEffect(() => {
    dispatch(fetchCoords());
  }, [dispatch]);

  useEffect(() => {
    getMultiple().then((res) => {
      dispatch(setAir(res));
    });
  }, []);

  //extraReducer запроса и вывода координат

  useEffect(() => {
    let timerId;
    //запрос данных с FlightRadar24 по введенным координатам
    timerId = setTimeout(function work() {
      // console.log(coordinate)
      getMultiple().then((res) => {
        const lat = +res[0][1][1];
        const lon = +res[0][1][2];
        const latPred = +res[0][1][4];
        const lonPred = +res[0][1][5].substring(0, res[0][1][5].length - 1);
        locate(lat, lon, latPred, lonPred)
          .then((res) => {
            res.map((item) => {
              item.push(Dalnost(item, lat, lon));
              item.push(Azimut(item, lat, lon));
            });
            return res;
          })
          //добавление в массив результатов азимута самолета
          .then((res) => {
            dispatch(set(res));
          })
          .then((res) => (timerId = setTimeout(work, 1000)))
          .catch((err) => {console.log(err)})
      });
    }, 1000);
  }, [coordinate]);

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
        <Tab.Screen name="Карта" component={Map} />
        <Tab.Screen name="Таблица" component={TableComponent} />
        <Tab.Screen name="Настройки" component={Settings} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
