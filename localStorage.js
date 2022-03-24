//работа с локальным хранилищем

import AsyncStorage from '@react-native-async-storage/async-storage';

//запись данных в локальное хранилище
export const storeData = async (name, latitude, longitude, radius, latPred, lonPred) => {
    try {
      const jsonValue = JSON.stringify([name, latitude, longitude, radius, latPred, lonPred]);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
    }
  };

  //чтение данных из локального хранилища
  export const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }