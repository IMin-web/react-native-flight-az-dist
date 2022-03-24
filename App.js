import React from "react";
import { View } from "react-native";
import {Provider} from 'react-redux'
import store from './store/store'
import Index from "./Index"

export default function App() {

  return (
    <View style={{flex: 1,
      backgroundColor: "#fff"}}>
      <Provider store={store}>
        <Index></Index>
      </Provider>
    </View>
  );
}


