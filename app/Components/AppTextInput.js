import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../config/Colors";
export default function AppTextInput({
  style,
  iconName,
  placeholder,
  ...otherProps
}) {
  return (
    <>
      <View style={[styles.container, style]}>
        {iconName && (
          <MaterialCommunityIcons
            name={iconName}
            size={20}
            style={styles.icon}
            color={Colors.medium}
          />
        )}
        <TextInput
          placeholder={placeholder}
          {...otherProps}
          style={styles.TextInput}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderWidth: 1,
    backgroundColor: Colors.light,
    borderRadius: 25,
    borderColor: Colors.light,
    flexDirection: "row",
    padding: 8,
    marginVertical: 10,
  },
  icon: {
    marginTop: 4,
  },
  TextInput: {
    flex: 1,
    color: Colors.dark_g,
    fontSize: 16,
    fontFamily: "nunito-regular",
    paddingLeft: 6,
  },
});
