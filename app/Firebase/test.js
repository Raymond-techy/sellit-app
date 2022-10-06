import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  FlatList,
  Button,
  AsyncStorage,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as ImageP from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../config/Colors";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

// export default function TestImagePicker() {
//   // const [imageUri, setImageUri] = useState([]);

// }
export const NetInfoApp = () => {
  // NetInfo.addEventListener((netInfo) => console.log(netInfo));
  // const unsubscribe = NetInfo.addEventListener((netInfo) =>
  //   console.log(netInfo)
  // );
  const demo = async () => {
    try {
      await AsyncStorage.setItem(
        "person",
        JSON.stringify({ id: 1, name: "shatta" })
      );
      const person = await AsyncStorage.getItem("person");
      const value = JSON.parse(person);
      console.log(value);
    } catch (error) {}
  };
  demo();
};
const styles = StyleSheet.create({
  removeImg: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderRadius: 35,
    padding: 4,
    zIndex: 100,
  },
  imgSelect: {
    margin: 5,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.light,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
