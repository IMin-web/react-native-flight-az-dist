import React from "react";
import { StyleSheet, View} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./HomeScreen";
import Map from "./Map";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function App() {
const Tab = createBottomTabNavigator();

  return (
    <View style={styles.container}>
      <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Таблица') {
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            } else if (route.name === 'Карта') {
              iconName = focused ? 'ios-list-circle-sharp' : 'ios-list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
                <Tab.Screen name="Таблица" component={HomeScreen} />

        <Tab.Screen name="Карта" component={Map} />
      </Tab.Navigator>
    </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  navigation: {
    height: 40,
    margin: 12,
    borderWidth: 1,
  },
});
