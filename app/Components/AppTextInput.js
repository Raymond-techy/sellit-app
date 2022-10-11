import React, { useState } from "react";
import { StyleSheet, View, TextInput, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Colors from "../config/Colors";
export default function AppTextInput({
  style,
  iconName,
  placeholder,
  ...otherProps
}) {
  const [isNew, setIsNew] = useState(false);
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
    // marginRight: "auto",
    // marginLeft: "auto",
  },
  icon: {
    // marginHorizontal: 12,
    marginTop: 4,
  },
  TextInput: {
    flex: 1,
    color: Colors.dark_g,
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "avenir" : "Roboto",
    paddingLeft: 6,
  },
});
