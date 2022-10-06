import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Icon from "./Icon";

export default function CategoryPickerItem({ item, handlePress }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress}>
        <Icon backgroundColor={item.bgColor} name={item.icon} />
        <Text style={styles.label}>{item.label}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    textAlign: "center",
    marginTop: 5,
  },
});
