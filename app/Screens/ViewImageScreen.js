import React from "react";
import { Image, StyleSheet, View, Button } from "react-native";
import Colors from "../config/Colors";

function ViewImageScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.closeIcon}></View>
      <View style={styles.deleteIcon}></View>

      <Image
        style={styles.image}
        resizeMode="contain"
        source={require("../assets/bg.jpg")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  closeIcon: {
    width: 50,
    height: 50,
    backgroundColor: Colors.primary,
    position: "absolute",
    top: 20,
    left: 30,
  },
  deleteIcon: {
    width: 50,
    height: 50,
    backgroundColor: Colors.secondary,
    position: "absolute",
    top: 20,
    right: 30,
  },
  container: {
    backgroundColor: Colors.dark,
    flex: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
export default ViewImageScreen;
