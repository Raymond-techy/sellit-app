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
function Card({
  title,
  subTitle,
  image,
  onPress,
  handleAddToWish,
  wishIcon = false,
  sellerBadge = false,
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
              color="rgb(238, 75, 43)"
            />
          </TouchableHighlight>
        )}
        {sellerBadge && (
          <View style={styles.owner}>
            <MaterialCommunityIcons
              name="information-variant"
              color="#38E54D"
              size={18}
            />
            <Text style={styles.txt}>Your Product</Text>
          </View>
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  Card: {
    backgroundColor: Colors.white,
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "100%",
  },
  owner: {
    width: "40%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light,
    borderRadius: 15,
  },
  image: {
    width: "100%",
    height: 200,
  },
  textCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    fontFamily: "nunito-bold",
  },
  subTitle: {
    fontSize: 18,
    // fontWeight: "bold",
    color: Colors.secondary,
    fontFamily: "nunito-bold",
  },
  wishIcon: {
    borderRadius: 25,
    zIndex: 100,
    padding: 10,
  },
});

export default Card;
