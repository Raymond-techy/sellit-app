import { Button, Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import Colors from "../config/Colors";

export default function WishItem({ image, title, subTitle, handleChat }) {
  return (
    <View style={styles.wish}>
      <View style={styles.flex}>
        <Image style={styles.img} source={{ uri: image }} resizeMode="cover" />
        <View style={styles.txtBox}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subTitle}>{subTitle}</Text>
        </View>
      </View>
      <View style={styles.btn}>
        <Button title="Chat Seller" onPress={handleChat} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wish: {
    borderRadius: 10,
    width: "100%",
    height: 80,
    backgroundColor: Colors.white,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
    padding: 20,
    marginBottom: 10,
  },
  txtBox: {
    padding: 10,
  },
  title: {
    fontWeight: "bold",
    fontFamily: "nunito-bold",
    fontSize: 18,
    marginBottom: 10,
    color: Colors.dark_g,
  },
  subTitle: {
    fontWeight: "bold",
    fontFamily: "nunito-regular",
    fontSize: 12,
    marginBottom: 5,
    color: Colors.medium,
  },
  flex: {
    width: "80%",
    flexDirection: "row",
  },
  btn: {},
  img: {
    borderRadius: 10,
    width: "30%",
    height: 80,
  },
});
