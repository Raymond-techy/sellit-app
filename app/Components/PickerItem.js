import { StyleSheet, Text, TouchableOpacity } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import Icon from "./Icon";

export default function PickerItem({ item, handlePress }) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <Icon iconColor={item.bgColor} name={item.iconColor} />
      <Text style={styles.PickerItem}>{item.label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  PickerItem: {
    padding: 16,
    color: Colors.dark_g,
    fontWeight: "bold",
    fontSize: 18,
  },
});
