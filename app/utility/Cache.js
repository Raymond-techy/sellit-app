import AsyncStorage from "@react-native-async-storage/async-storage";

import moment from "moment";

const prefix = "cache";
const expiryInMInute = 30;
const store = async (key, value) => {
  try {
    const item = { value, timestamp: Date.now() };
    const jsonValue = JSON.stringify(item);
    await AsyncStorage.setItem(prefix + key, jsonValue);
  } catch (error) {
    throw Error(error);
  }
};

const isExpired = async (item) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minutes") > expiryInMInute;
};

const get = async (key) => {
  try {
    const value = await AsyncStorage.getItem(prefix + key);
    const item = JSON.parse(value);

    if (!item) return null;

    if (isExpired(item)) {
      await AsyncStorage.removeItem(prefix + key);
      return null;
    }
    return item.value;
  } catch (error) {}
};
export default {
  store,
  get,
};
