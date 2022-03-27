import React from 'react';
import { StyleSheet, View, SafeAreaView, Text, Alert, Pressable } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";

const Separator = () => (
  <View style={styles.separator} />
);

const App = () => (
  <SafeAreaView style={styles.container}>
    <View style={styles.container2}>
      <Text style={styles.title}>The application requests aircraft data from the FlightRadar24 website in a zone defined by the user within the required radius.
      The application does not pursue the receipt of material benefits.
      </Text>
    </View>
    <Separator />
    <View style={styles.container2}>
      <Text style={styles.title}>
      Do you have suggestions for security applications? Or want to report a bug you've found?
            </Text>
      <View style={styles.fixToText}>
        <Pressable
          onPress={() => Alert.alert('Left button pressed')}
        >
                <Ionicons  name={"logo-github"} size={50} color={"black"} />
</Pressable>
      </View>
    </View>
    <Separator />
    <View style={styles.container2}>
      <Text style={styles.title}>
Developer: Ilya Minchenko (IMin-web)      </Text>
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    marginHorizontal: 16,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 16,
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default App;