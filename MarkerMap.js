import { Marker, Callout } from "react-native-maps";
import { Text, View, Image } from "react-native";
import {markerStyle} from "./styles";
import React, { useState, useRef, useEffect } from "react";


export default function MarkerMap(props) {
  const item = props.data;
  return (
    <Marker
      key={item[0]}
      coordinate={{ latitude: item[2], longitude: item[3] }}
    >
      <View>
        <Image
          source={require("./assets/airplane.png")}
          style={{
            width: 32,
            height: 32,
            transform: [{ rotateZ: `${item[4]}deg` }],
            tintColor: "red",
          }}
          resizeMode="contain"
        />
        {/* формуляр самолета */}
      </View>
        <Callout style={markerStyle.marker}>
          <Text>{item[17] || "Без названия"}</Text>
          <Text>Азимут: {Math.round(item[20])}</Text>
          <Text>Дальность: {Math.round(item[19] / 100) / 10}</Text>
          <Text>Высота: {Math.round(item[5] / 0.33) / 10}</Text>
          <Text>Скорость: {Math.round(item[6] * 1.87)}</Text>
          <Text>Курс: {item[4]}</Text>
        </Callout>
    </Marker>
  );
}
