import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../config/Colors";

export default function Message({ text, style }) {
  return (
    <View style={[styles.message, style]}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    width: 150,
    height: "auto",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
});
