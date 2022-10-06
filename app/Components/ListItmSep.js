import React from "react";
import { View, StyleSheet } from "react-native";
import Colors from "../config/Colors";
function ListItmSep() {
  return <View style={styles.separator} />;
}
const styles = StyleSheet.create({
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.light,
  },
});
export default ListItmSep;
