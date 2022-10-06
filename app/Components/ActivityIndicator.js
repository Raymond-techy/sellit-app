import React from "react";
import LottieView from "lottie-react-native";
import { View, StyleSheet } from "react-native";
export default function ActivityIndicator({
  visible = false,
  source = require("../assets/animations/loader.json"),
}) {
  if (!visible) return null;
  return (
    <View style={styles.overlay}>
      <LottieView autoPlay loop source={source} style={{ zIndex: 8 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: "absolute",
    flex: 1,
    backgroundColor: "#fff",
    opacity: 0.8,
    zIndex: 5,
    width: "100%",
    height: "100%",
  },
});
