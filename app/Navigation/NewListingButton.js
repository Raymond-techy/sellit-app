import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Colors from "../config/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function NewListingButton({ handlePress }) {
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <MaterialCommunityIcons
          name="plus-circle"
          size={30}
          color={Colors.white}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    height: 60,
    width: 60,

    borderWidth: 5,
    borderColor: Colors.white,
    borderRadius: 40,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
