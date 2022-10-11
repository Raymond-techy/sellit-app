import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import Colors from "../config/Colors";
import { TouchableHighlight } from "react-native-gesture-handler";
function SmallCard({
  title,
  subTitle,
  image,
  onPress,
  handleAddToWish,
  wishIcon = false,
}) {
  return (
    <View style={styles.Card}>
      <TouchableWithoutFeedback onPress={onPress}>
        <Image
          source={{ uri: image }}
          style={styles.image}
          resizeMode="cover"
        />
      </TouchableWithoutFeedback>
      <View style={styles.textCard}>
        <View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
        {wishIcon && (
          <TouchableHighlight
            onPress={handleAddToWish}
            underlayColor={Colors.light}
            style={styles.wishIcon}
          >
            <MaterialCommunityIcons
              name="heart-circle-outline"
              size={30}
              color={Colors.primary}
            />
          </TouchableHighlight>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Card: {
    backgroundColor: Colors.light,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: 200,
    marginHorizontal: 10,
  },
  image: {
    width: "100%",
    height: 100,
  },
  textCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.secondary,
  },
  wishIcon: {
    borderRadius: 25,
    zIndex: 100,
    padding: 10,
  },
});

export default SmallCard;
