import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../config/Colors";

export default function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;
  return (
    <View>
      <Text style={styles.error}>{error}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  error: {
    color: Colors.danger,
    paddingLeft: 4,
    fontWeight: "500",
  },
});
