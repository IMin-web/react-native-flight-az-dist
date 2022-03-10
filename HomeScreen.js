import { PanResponder, Animated, Button, View, StyleSheet} from 'react-native';
import React, { useRef, useState } from "react";

export default function HomeScreen({navigation}) {
    const fadeAnim = useRef(new Animated.Value(1)).current;
    const [boxAnim, setBoxAnim] = useState(false)
    const pan = useRef(new Animated.ValueXY()).current;

    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event([
        null,
        {
          dx: pan.x, // x,y are Animated.Value
          dy: pan.y,
        },
      ]),
      onPanResponderRelease: () => {
        Animated.spring(
          pan, // Auto-multiplexed
          { toValue: { x: 0, y: 0 } } // Back to zero
        ).start();
      },
    });

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000
    }).start();
    setBoxAnim(false)
  };

  const fadeOut = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 1000
    }).start();
    setBoxAnim(true)
  };

  function boxHandler(){
    boxAnim ? fadeIn() : fadeOut();
  }

    return (
        <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
        <Animated.View {...panResponder.panHandlers} style={[styles.animated, pan.getLayout()]}/>
        {/* <Button onPress={boxHandler} title='Press me!'></Button> */}
      <Button
        title="Go to Map"
        onPress={() =>
          navigation.navigate('Map')
        }
      />
      </View>
    );
  };
  const styles=StyleSheet.create({
    animated:{
        position:'absolute',
        top:50,
        left:50,
        height: 100,
        width:100,
        backgroundColor:'#f194ff',
    }
})