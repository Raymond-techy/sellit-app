import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import * as ImageP from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../config/Colors";
import { useFormikContext } from "formik";

export default function ImagePicker({ handleDelete, handleAdd }) {
  const { values } = useFormikContext();
  const imageUris = values["imgurl"];
  const requestPermission = async () => {
    const { granted } = await ImageP.requestCameraPermissionsAsync();
    if (!granted) alert("You need to enable media permission");
  };
  useEffect(() => {
    requestPermission();
  }, []);

  const twoButtonAlert = (itemId) => {
    Alert.alert("Delete Image", "Are you sure to delete images", [
      {
        text: "Yes",
        onPress: () => handleDelete(itemId),
      },
      {
        text: "No",
      },
    ]);
  };

  const scrollView = useRef();
  return (
    <View style={styles.listImg}>
      <ScrollView
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        ref={scrollView}
        horizontal
        onContentSizeChange={() => scrollView.current.scrollToEnd()}
      >
        <View style={{ flexDirection: "row" }}>
          {imageUris.map((img) => (
            <TouchableOpacity key={img.id}>
              <View>
                <Ionicons
                  onPress={() => twoButtonAlert(img.id)}
                  name="close"
                  size={10}
                  color={Colors.danger}
                  style={styles.removeImg}
                />
                <Image
                  resizeMode="cover"
                  source={{ uri: img.uri }}
                  style={{
                    width: 80,
                    height: 80,
                    margin: 5,
                    padding: 10,
                    borderRadius: 10,
                    backgroundColor: Colors.light,
                  }}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity onPress={handleAdd}>
          <View style={styles.imgSelect}>
            <Ionicons size={30} color={Colors.medium} name="camera" />
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  removeImg: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    borderRadius: 35,
    padding: 4,
    zIndex: 100,
  },
  imgSelect: {
    margin: 5,
    padding: 10,
    borderRadius: 15,
    backgroundColor: Colors.light,
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
});
