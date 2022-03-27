//работа с локальным хранилищем

import AsyncStorage from '@react-native-async-storage/async-storage';

//запись данных в локальное хранилище
export const storeData = async (name, latitude, longitude, radius, latPred, lonPred) => {
    try {
      const jsonValue = JSON.stringify([name, latitude, longitude, radius, latPred, lonPred]);
      await AsyncStorage.setItem(`${name}`, jsonValue);
    } catch (e) {
      // saving error
    }
  };

  //чтение данных из локального хранилища
  export const getData = async (name) => {
    try {
      if (name){
        const jsonValue = await AsyncStorage.getItem(`${name}`)
        return jsonValue != null ? JSON.parse(jsonValue) : null;
      } 
      else{
        const jsonValue = await getAllKeys().then((res)=>{return res[0]}).then((res)=>{return AsyncStorage.getItem(`${res}`)})
      return jsonValue != null ? JSON.parse(jsonValue) : null;
      }
    } catch(e) {
      // error reading value
    }
  }

  export const removeValue = async (name) => {
    try {
      await AsyncStorage.removeItem(`${name}`)
    } catch(e) {
      // remove error
    }
  }

  export const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      // read key error
    }
    return keys
  }

  export const getMultiple = async () => {
    let newValues = [];
    let values
    try {
      const array = await getAllKeys()
      values = await AsyncStorage.multiGet(array)
      values.map((item)=>{
        let arr =[]
        arr.push(item[0]) 
        arr.push(item[1].split(','))
        newValues.push(arr)
        })
    } catch(e) {
      // read error
    }
    return newValues;
  }