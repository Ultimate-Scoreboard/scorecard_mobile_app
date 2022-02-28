import AsyncStorage from "@react-native-async-storage/async-storage";

const saveAsyncStorage = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (error) {
    return error;
  }
};

const getAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (error) {
    return error;
  }
};

const removeAsyncStorage = async (key) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (error) {
    return error;
  }
};

const clearAsyncStorage = async () => {
  try {
    return await AsyncStorage.clear();
  } catch (error) {
    return error;
  }
};

export default {
  getAsyncStorage,
  saveAsyncStorage,
  clearAsyncStorage,
  removeAsyncStorage,
};
