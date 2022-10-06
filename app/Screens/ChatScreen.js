import { StyleSheet, Text, View } from "react-native";
import React from "react";
import moment from "moment";
import Screen from "../Components/Screen";
import ListItem from "../Components/ListItem";
import Colors from "../config/Colors";
export default function ChatScreen() {
  const now = Date.now();
  return (
    <Screen>
      <View style={styles.ChatScreen}>
        <View style={styles.user}>
          <ListItem
            title="Eddy"
            imgSrc={require("../assets/mosh(3).jpg")}
            chevron={false}
            subtitle={moment().format("LT")}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  user: {
    width: "100%",
    height: 87,
    backgroundColor: Colors.primary,
  },
});
