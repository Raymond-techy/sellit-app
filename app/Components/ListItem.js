import React from "react";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Image,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import Colors from "../config/Colors";
function ListItem({
  chevron = true,
  imgURL,
  title,
  subtitle,
  imgSrc,
  handlePress,
  renderRightActions,
  IconComponent,
}) {
  return (
    <GestureHandlerRootView>
      <Swipeable renderRightActions={renderRightActions}>
        <TouchableHighlight onPress={handlePress} underlayColor={Colors.medium}>
          <View style={styles.container}>
            {IconComponent}
            {imgSrc ? <Image style={styles.image} source={imgSrc} /> : null}
            {imgURL ? (
              <Image style={styles.image} source={{ uri: imgURL }} />
            ) : null}
            <View style={styles.txtContent}>
              <Text style={styles.title} numberOfLines={1}>
                {title}
              </Text>
              {subtitle && (
                <Text numberOfLines={2} style={styles.subtitle}>
                  {subtitle}
                </Text>
              )}
            </View>
            {chevron && (
              <MaterialCommunityIcons
                color={Colors.medium}
                name="chevron-right"
                size={25}
              />
            )}
          </View>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
const styles = StyleSheet.create({
  image: {
    width: 55,
    height: 55,
    borderRadius: 28,
  },
  container: {
    padding: 15,
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: Colors.white,
  },
  subtitle: {
    fontColor: "#6e6969",
    fontSize: 12,
  },
  title: {
    fontWeight: "500",
    fontSize: 18,
    paddingBottom: 3,
  },
  txtContent: {
    marginLeft: 15,
    justifyContent: "center",
    flex: 1,
  },
});
export default ListItem;
