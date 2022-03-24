import React, {useEffect} from "react";
import {Alert, DevSettings} from "react-native";
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
import { selectCoordinate, fetchCoords } from "./store/coordinateSlice";
import { set } from "./store/dataSlice"

export default function Index() {
    const Tab = createBottomTabNavigator();
    const coordinate = useSelector(selectCoordinate); 
    const dispatch = useDispatch();

    //extraReducer запроса и вывода координат
    useEffect(() => {dispatch(fetchCoords())}, [dispatch]);
 
    useEffect(() => {
      let result;
      //запрос данных с FlightRadar24 по введенным координатам
      locate(coordinate.lat, coordinate.lon, coordinate.latPred, coordinate.lonPred) 
        .then((res) => (result = res))
        //добавление в массив результатов дальности до самолета
        .then((res) => result.map((item) => {item.push(Dalnost(item, coordinate.lat, coordinate.lon)); item.push(Azimut(item, coordinate.lat, coordinate.lon))})) 
        //добавление в массив результатов азимута самолета
        .then((res) => dispatch(set(result)))
        .catch(()=>{Alert.alert(
          "Ошибка!",
          "Проверьте подключение к интернету и перезагрузите приложение.",
          [
            {
              text: "Отмена",
              style: "cancel"
            },
            { text: "Перезагрузка", onPress : () => DevSettings.reload() }
          ]
        );})
    });

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