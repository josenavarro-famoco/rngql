import { AsyncStorage } from 'react-native';

export const removeItem = (key, cb) => {
  AsyncStorage.removeItem(key, cb);
}

export const saveItem = (key, value, cb) => {
  AsyncStorage.setItem(key, value, cb);
}

export const getItem = (key, cb) => {
  AsyncStorage.getItem(key, cb);
}
