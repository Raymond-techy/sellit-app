import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import Constants from "expo-constants";
import { useNetInfo } from "@react-native-community/netinfo";
export default function OfflineNotice() {
  const netInfo = useNetInfo();
  if (netInfo.isInternetReachable === false && netInfo.details !== "unknown")
    return (
      <View style={styles.container}>
        <Text>You are currently offline</Text>
      </View>
    );
  return null;
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 25,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.danger,
    height: 50,
    top: Constants.statusBarHeight,
    width: "100%",
    zIndex: 1000,
  },
});
