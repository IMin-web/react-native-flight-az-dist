import React from "react";
import { Pressable, Text, ScrollView, View } from "react-native";
import { settingsStyle } from "./styles";
import CurrentProfile from "./components/CurrentProfile";
import CreateProfile from "./components/CreateProfile";
import About from "./components/About";
import { createNativeStackNavigator,} from "@react-navigation/native-stack";

export const Separator = () => (
  <View style={settingsStyle.separator} />
);

function Settings({ navigation }) {
  return (
    <ScrollView>
      <Pressable
        style={settingsStyle.navButton}
        onPress={() => navigation.navigate("CurrentProfile")}
      >
        <Text style={{ fontSize: 24 }}>Текущий профиль</Text>
      </Pressable>
      <Separator />
      <Pressable
        style={settingsStyle.navButton}
        onPress={() => navigation.navigate("CreateProfile")}
      >
        <Text style={{ fontSize: 24 }}>Создание профиля</Text>
      </Pressable>
      <Separator />
      <Pressable
        style={settingsStyle.navButton}
        onPress={() => navigation.navigate("About")}
      >
        <Text style={{ fontSize: 24 }}>О приложении</Text>
      </Pressable>
      <Separator />
    </ScrollView>
  );
}

export default function SettingsStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
      <Stack.Screen name="CurrentProfile" component={CurrentProfile} />
      <Stack.Screen name="CreateProfile" component={CreateProfile} />
      <Stack.Screen name="About" component={About} />
      </Stack.Group>
    </Stack.Navigator>
  );
}
