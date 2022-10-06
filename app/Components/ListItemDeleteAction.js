import React from "react";
import { StyleSheet, TouchableHighlight, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../config/Colors";
function ListItemDeleteAction({ handlePress }) {
  return (
    <View style={styles.container}>
      <TouchableHighlight
        underlayColor="rgba(52, 52, 52, 0.3)"
        style={styles.icon}
        onPress={handlePress}
      >
        <Ionicons name="ios-trash-outline" size={24} color={Colors.white} />
      </TouchableHighlight>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.danger,
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    padding: 15,
    borderRadius: 30,
  },
});
export default ListItemDeleteAction;
