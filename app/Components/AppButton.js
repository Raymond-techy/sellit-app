import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Colors from "../config/Colors";
function AppButton({ title, handlePress, color }) {
  return (
    <TouchableOpacity
      style={{ ...styles.buttonContainer, backgroundColor: Colors[color] }}
      onPress={handlePress}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: "100%",
    height: 45,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 6,
  },
  text: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});
export default AppButton;
