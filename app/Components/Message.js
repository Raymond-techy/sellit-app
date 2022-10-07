import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Message({ text, style }) {
  return (
    <View style={styles.message}>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    width: 60,
    height: "auto",
  },
});
