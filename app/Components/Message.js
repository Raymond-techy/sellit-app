import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Message({ text, style }) {
  return (
    <View style={[styles.message, style]}>
      <Text style={styles.txt}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    maxWidth: 150,
    minWidth: 60,
    height: "auto",
    borderRadius: 10,
    marginBottom: 15,
    padding: 10,
  },
  txt: {
    fontFamily: "nunito-bold",
  },
});
